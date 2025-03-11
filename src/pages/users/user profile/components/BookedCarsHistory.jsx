"use client"

import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, DollarSign, Car, AlertCircle } from "lucide-react"
import { useMemo } from "react"

export default function BookedCarsHistory() {
  // Safely access Redux store
  const authState = useSelector((state) => state.auth) || { user: null }
  const user = authState.user || {}

  const contracts = useSelector((state) => state.contracts) || []
  const cars = useSelector((state) => state.cars) || []

  const languageState = useSelector((state) => state.language) || { language: "en" }
  const language = languageState.language || "en"

  // Filter contracts for the current user
  const userContracts = useMemo(() => {
    return contracts.filter((contract) => contract.userId === user.id)
  }, [contracts, user.id])

  // Translations
  const translations = {
    en: {
      title: "Booked Cars History",
      description: "View all your car bookings",
      noBookings: "You don't have any car bookings yet",
      car: "Car",
      dates: "Booking Period",
      duration: "Duration",
      price: "Total Price",
      to: "to",
      days: "days",
      day: "day",
    },
    ar: {
      title: "سجل السيارات المحجوزة",
      description: "عرض جميع حجوزات السيارات الخاصة بك",
      noBookings: "ليس لديك أي حجوزات سيارات حتى الآن",
      car: "السيارة",
      dates: "فترة الحجز",
      duration: "المدة",
      price: "السعر الإجمالي",
      to: "إلى",
      days: "أيام",
      day: "يوم",
    },
  }

  const t = translations[language] || translations.en

  // Function to get car details by ID
  const getCarById = (carId) => {
    return cars.find((car) => car.id === carId) || {}
  }

  // Function to format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      const month = date.toLocaleString("default", { month: "short" })
      const day = date.getDate()
      const year = date.getFullYear()
      return `${month} ${day}, ${year}`
    } catch (error) {
      return dateString
    }
  }

  // Function to calculate duration in days
  const calculateDuration = (startDate, endDate) => {
    try {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include the end day
      return diffDays > 1 ? `${diffDays} ${t.days}` : `1 ${t.day}`
    } catch (error) {
      return "N/A"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {userContracts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{t.noBookings}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.car}</TableHead>
                <TableHead>{t.dates}</TableHead>
                <TableHead>{t.duration}</TableHead>
                <TableHead>{t.price}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userContracts.map((contract) => {
                const car = getCarById(contract.carId)
                return (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden">
                          <img
                            src={car.image || "/placeholder.svg?height=48&width=48"}
                            alt={`${car.name} ${car.model}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p>
                            {car.name} {car.model}
                          </p>
                          <p className="text-xs text-muted-foreground">{car.year}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {formatDate(contract.startDate)} {t.to} {formatDate(contract.endDate)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span>{calculateDuration(contract.startDate, contract.endDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{contract.price}</span>
                        MAD
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

