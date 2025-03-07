"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function RentalDurationStats({ contracts, cars }) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Process contracts data to get average rental duration by car
    const carDurations = {}

    contracts.forEach((contract) => {
      if (!carDurations[contract.carId]) {
        carDurations[contract.carId] = {
          carId: contract.carId,
          totalDays: 0,
          count: 0,
        }
      }

      const startDate = new Date(contract.startDate)
      const endDate = new Date(contract.endDate)
      const days = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))

      carDurations[contract.carId].totalDays += days
      carDurations[contract.carId].count++
    })

    // Calculate average and add car details
    const durationData = Object.values(carDurations)
      .map((item) => {
        const car = cars.find((car) => car.id === item.carId)
        return {
          name: car ? `${car.name} ${car.model}` : `Car #${item.carId}`,
          avgDuration: Math.round(item.totalDays / item.count),
        }
      })
      .sort((a, b) => b.avgDuration - a.avgDuration)
      .slice(0, 8) // Top 8 cars

    setData(durationData)
  }, [contracts, cars])

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value) => [value, "Average Days"]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          />
          <Bar dataKey="avgDuration" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

