import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Check, X, Eye } from "lucide-react"
import { format } from "date-fns"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom";
import ConfirmAlert from "@/components/context/ConfirmAlert"

export default function OrdersList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders)
  const cars = useSelector((state) => state.cars)
  const users = useSelector((state) => state.users)
  const contracts = useSelector((state) => state.contracts)
  const { language, direction } = useSelector((state) => state.language)
  const apiURL = import.meta.env.VITE_DATA_API_URL

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  })

  // Find car and user details for an order
  const getOrderDetails = (order) => {
    const car = cars.find((car) => car.id === order.carId)
    const user = users.find((user) => user.id === order.userId)
    return { car, user }
  }

  // Calculate total days between start and end date
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Format date based on language
  const formatDate = (date) => {
    try {
      return format(new Date(date), "PPP")
    } catch (error) {
      return date
    }
  }

  function deleteOrder(order) {
    axios
      .delete(`${apiURL}/orders/${order.id}`)
      .then(() => {
        dispatch({ type: "DELETE_ORDER", payload: order.id })
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log("API not valid or not working, ignoring error and dispatching action.")
          dispatch({ type: "DELETE_ORDER", payload: order.id })
        } else {
          console.log(err)
        }
      })
  }

  // Validate order and create contract
  const validateOrder = (order) => {
    // Create new contract from order
    const newContract = {
      id: Date.now().toString(),
      userId: order.userId,
      carId: order.carId,
      startDate: order.startDate,
      endDate: order.endDate,
      price: order.price,
    }

    const car = cars.find((car) => car.id === order.carId)

    // Add to contract
    const nextId = (Math.max(...contracts.map((contract) => Number.parseInt(contract.id))) + 1).toString()
    axios
      .post(`${apiURL}/contracts`, {...newContract, id: nextId})
      .then((res) => {
        // Update car availability
        axios
          .patch(`${apiURL}/cars/${newContract.carId}`, {
            available: false,
          })
          .then(() => {
            dispatch({
              type: "UPDATE_CAR",
              payload: { ...car, available: false },
            })
          })
          .catch((err) => console.log(err))
        dispatch({
          type: "ADD_CONTRACT",
          payload: { ...newContract, id: nextId },
        })
        deleteOrder(order)
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log("API not valid or not working, ignoring error and dispatching action.")
          dispatch({
            type: "ADD_CONTRACT",
            payload: { ...newContract, id: nextId },
          })
          dispatch({ type: "DELETE_ORDER", payload: order.id })
        } else {
          console.log(err)
        }
      })

    // Show success notification
    setNotification({
      show: true,
      message: language === "en" ? "Order validated successfully!" : "تم التحقق من الطلب بنجاح!",
      type: "success",
    })

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" })
    }, 3000)
  }

  // Reject order
  const rejectOrder = (order) => {
    let isDeleted = false
    if (confirm("Are you sure you want to reject this order?")) {
      axios
        .delete(`${apiURL}/orders/${order.id}`)
        .then(() => {
          dispatch({ type: "DELETE_ORDER", payload: order.id })
          isDeleted = true
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            console.log("API not valid or not working, ignoring error and dispatching action.")
            dispatch({ type: "DELETE_ORDER", payload: order.id })
            isDeleted = true
          } else {
            console.log(err)
          }
        })
      if (isDeleted) {
        setNotification({
          show: true,
          message: language === "en" ? "Order rejected!" : "تم رفض الطلب!",
          type: "error",
        })

        setTimeout(() => {
          setNotification({ show: false, message: "", type: "" })
        }, 3000)
      }
    }
  }

  const pendingOrders = orders.filter((order) => order.status === "pending")

  return (
    <div className={`container mx-auto p-4 ${direction === "rtl" ? "rtl" : "ltr"}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{language === "en" ? "Orders Management" : "إدارة الطلبات"}</h1>
        <p className="text-muted-foreground">
          {language === "en" ? "View, validate or reject rental orders" : "عرض وتأكيد أو رفض طلبات التأجير"}
        </p>
      </div>

      {notification.show && (
        <Alert
          className={`mb-4 ${
            notification.type === "success"
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-red-50 border-red-500 text-red-800"
          }`}
        >
          <AlertTitle>
            {notification.type === "success"
              ? language === "en"
                ? "Success"
                : "نجاح"
              : language === "en"
                ? "Error"
                : "خطأ"}
          </AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">
            {language === "en" ? "Pending" : "قيد الانتظار"}
            {pendingOrders.length > 0 && (
              <span className="ml-2 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                {pendingOrders.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="contracts">{language === "en" ? "Contracts" : "العقود"}</TabsTrigger>
        </TabsList>

        {/* Pending Orders */}
        <TabsContent value="pending">
          <div className="rounded-md border shadow-sm overflow-hidden">
            <div className="p-2 bg-muted/30 border-b">
              <h2 className="text-xl font-semibold">{language === "en" ? "Pending Orders" : "الطلبات قيد الانتظار"}</h2>
            </div>

            {pendingOrders.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  {language === "en" ? "No pending orders found" : "لا توجد طلبات قيد الانتظار"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">{language === "en" ? "Order ID" : "رقم الطلب"}</TableHead>
                      <TableHead>{language === "en" ? "Customer" : "العميل"}</TableHead>
                      <TableHead>{language === "en" ? "Car" : "السيارة"}</TableHead>
                      <TableHead>{language === "en" ? "Dates" : "التواريخ"}</TableHead>
                      <TableHead>{language === "en" ? "Duration" : "المدة"}</TableHead>
                      <TableHead>{language === "en" ? "Price" : "السعر"}</TableHead>
                      <TableHead>{language === "en" ? "Status" : "الحالة"}</TableHead>
                      <TableHead className="text-center">{language === "en" ? "Actions" : "الإجراءات"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingOrders.map((order) => {
                      const { car, user } = getOrderDetails(order)
                      const days = calculateDays(order.startDate, order.endDate)

                        const totalPrice = days * car?.price
                        return (
                        <TableRow key={order.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>{user?.name}</TableCell>
                          <TableCell>
                          {car?.name} {car?.model} ({car?.year})
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                          <div className="text-sm">{formatDate(order.startDate)}</div>
                          <div className="text-sm">{formatDate(order.endDate)}</div>
                          </TableCell>
                          <TableCell>
                          {days} {language === "en" ? "days" : "أيام"}
                          </TableCell>
                          <TableCell className="font-medium">${totalPrice}</TableCell>
                          <TableCell>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            {language === "en" ? "Pending" : "قيد الانتظار"}
                          </Badge>
                          </TableCell>
                          <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8">
                              <Eye className="h-4 w-4 mr-1" />
                              {language === "en" ? "Details" : "التفاصيل"}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                              <DialogTitle>
                                {language === "en" ? "Order Details" : "تفاصيل الطلب"} #{order.id}
                              </DialogTitle>
                              <DialogDescription>
                                {language === "en"
                                ? "Review order information before validation"
                                : "مراجعة معلومات الطلب قبل التحقق"}
                              </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                <h3 className="font-semibold mb-2">
                                  {language === "en" ? "Car Details" : "تفاصيل السيارة"}
                                </h3>
                                <div className="space-y-1 text-sm">
                                  <p>
                                  <span className="font-medium">
                                    {language === "en" ? "Make" : "الصانع"}:
                                  </span>{" "}
                                  {car?.name}
                                  </p>
                                  <p>
                                  <span className="font-medium">
                                    {language === "en" ? "Model" : "الموديل"}:
                                  </span>{" "}
                                  {car?.model}
                                  </p>
                                  <p>
                                  <span className="font-medium">{language === "en" ? "Year" : "السنة"}:</span>{" "}
                                  {car?.year}
                                  </p>
                                  <p>
                                  <span className="font-medium">{language === "en" ? "Type" : "النوع"}:</span>{" "}
                                  {car?.type}
                                  </p>
                                  <p>
                                  <span className="font-medium">
                                    {language === "en" ? "Daily Rate" : "السعر اليومي"}:
                                  </span>{" "}
                                  ${car?.price}
                                  </p>
                                </div>
                                </div>
                                <div>
                                <h3 className="font-semibold mb-2">
                                  {language === "en" ? "Customer Details" : "تفاصيل العميل"}
                                </h3>
                                <div className="space-y-1 text-sm">
                                  <p>
                                  <span className="font-medium">{language === "en" ? "Name" : "الاسم"}:</span>{" "}
                                  {user?.name}
                                  </p>
                                  <p>
                                  <span className="font-medium">
                                    {language === "en" ? "Email" : "البريد الإلكتروني"}:
                                  </span>{" "}
                                  {user?.email}
                                  </p>
                                  <p>
                                  <span className="font-medium">
                                    {language === "en" ? "Phone" : "الهاتف"}:
                                  </span>{" "}
                                  {user?.phone}
                                  </p>
                                  <p>
                                  <span className="font-medium">
                                    {language === "en" ? "ID" : "رقم الهوية"}:
                                  </span>{" "}
                                  {user?.cin}
                                  </p>
                                  <p>
                                  <span className="font-medium">
                                    {language === "en" ? "Address" : "العنوان"}:
                                  </span>{" "}
                                  {user?.address}
                                  </p>
                                </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">
                                {language === "en" ? "Rental Details" : "تفاصيل التأجير"}
                                </h3>
                                <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">
                                  {language === "en" ? "Start Date" : "تاريخ البدء"}:
                                  </span>{" "}
                                  {formatDate(order.startDate)}
                                </p>
                                <p>
                                  <span className="font-medium">
                                  {language === "en" ? "End Date" : "تاريخ الانتهاء"}:
                                  </span>{" "}
                                  {formatDate(order.endDate)}
                                </p>
                                <p>
                                  <span className="font-medium">
                                  {language === "en" ? "Duration" : "المدة"}:
                                  </span>{" "}
                                  {calculateDays(order.startDate, order.endDate)}{" "}
                                  {language === "en" ? "days" : "أيام"}
                                </p>
                                <p>
                                  <span className="font-medium">
                                  {language === "en" ? "Total Price" : "السعر الإجمالي"}:
                                  </span>{" "}
                                  {totalPrice} MAD
                                </p>
                                </div>
                              </div>
                              </div>
                              <DialogFooter className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => rejectOrder(order)}>
                                <X className="h-4 w-4 mx-1" />
                                {language === "en" ? "Reject" : "رفض"}
                              </Button>
                              <Button onClick={() => validateOrder(order)} className="bg-brand-600">
                                <Check className="h-4 w-4 mx-1" />
                                {language === "en" ? "Validate" : "قبول"}
                              </Button>
                              </DialogFooter>
                            </DialogContent>
                            </Dialog>
                            <Button
                            variant="destructive"
                            size="sm"
                            className="h-8"
                            onClick={() => rejectOrder(order)}
                            >
                            <X className="h-4 w-4 mr-1" />
                            {language === "en" ? "Reject" : "رفض"}
                            </Button>
                            <Button variant="default" size="sm" className="h-8 bg-brand-600" onClick={() => validateOrder(order)}>
                            <Check className="h-4 w-4 mr-1" />
                            {language === "en" ? "Validate" : "تحقق"}
                            </Button>
                          </div>
                          </TableCell>
                        </TableRow>
                        )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Contracts */}
        <TabsContent value="contracts">
          <div className="rounded-md border shadow-sm overflow-hidden">
            <div className="p-4 bg-muted/30 border-b">
              <h2 className="text-xl font-semibold">{language === "en" ? "Active Contracts" : "العقود النشطة"}</h2>
            </div>

            {contracts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">{language === "en" ? "No contracts found" : "لا توجد عقود"}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">{language === "en" ? "Contract ID" : "رقم العقد"}</TableHead>
                      <TableHead>{language === "en" ? "Customer" : "العميل"}</TableHead>
                      <TableHead>{language === "en" ? "Car" : "السيارة"}</TableHead>
                      <TableHead>{language === "en" ? "Start Date" : "تاريخ البدء"}</TableHead>
                      <TableHead>{language === "en" ? "End Date" : "تاريخ الانتهاء"}</TableHead>
                      <TableHead>{language === "en" ? "Price" : "السعر"}</TableHead>
                      <TableHead>{language === "en" ? "Actions" : "الإجراءات"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.map((contract) => {
                      const car = cars.find((car) => car.id === contract.carId)
                      const user = users.find((user) => user.id === contract.userId)
                      return (
                        <TableRow key={contract.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">#{contract.id}</TableCell>
                          <TableCell>{user?.name}</TableCell>
                          <TableCell>
                            {car?.name} {car?.model} ({car?.year})
                          </TableCell>
                          <TableCell>{formatDate(contract.startDate)}</TableCell>
                          <TableCell>{formatDate(contract.endDate)}</TableCell>
                          <TableCell className="font-medium">${contract.price}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8"
                              onClick={() => navigate(`/dashboard/contracts/${contract.id}`)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              {language === "en" ? "View" : "عرض"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

