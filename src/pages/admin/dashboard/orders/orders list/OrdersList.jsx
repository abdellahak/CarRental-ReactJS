"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, X, Eye, Calendar, Car, User } from "lucide-react";
import { format } from "date-fns";
import ConfirmAlert from "@/components/context/ConfirmAlert";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function OrdersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const cars = useSelector((state) => state.cars);
  const users = useSelector((state) => state.users);
  const contracts = useSelector((state) => state.contracts);
  const { language, direction } = useSelector((state) => state.language);
  const apiURL = import.meta.env.VITE_DATA_API_URL;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Find car and user details for an order
  const getOrderDetails = (order) => {
    const car = cars.find((car) => car.id === order.carId);
    const user = users.find((user) => user.id === order.userId);
    return { car, user };
  };

  // Calculate total days between start and end date
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date based on language
  const formatDate = (date) => {
    try {
      return format(new Date(date), "PPP");
    } catch (error) {
      return date;
    }
  };
  function deleteOrder(order) {
    axios
      .delete(`${apiURL}/orders/${order.id}`)
      .then(() => {
        dispatch({ type: "DELETE_ORDER", payload: order.id });
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log(
            "API not valid or not working, ignoring error and dispatching action."
          );
          dispatch({ type: "DELETE_ORDER", payload: order.id });
        } else {
          console.log(err);
        }
      });
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
    };

    const car = cars.find((car) => car.id === order.carId);

    // Add to contract
    const nextId = (
      Math.max(...contracts.map((contract) => parseInt(contract.id))) + 1
    ).toString();
    axios
      .post(`${apiURL}/contracts`, newContract)
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
            });
          })
          .catch((err) => console.log(err));
        dispatch({
          type: "ADD_CONTRACT",
          payload: { ...contractDetails, id: nextId },
        });
        deleteOrder(order);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log(
            "API not valid or not working, ignoring error and dispatching action."
          );
          dispatch({
            type: "ADD_CONTRACT",
            payload: { ...contractDetails, id: nextId },
          });
          dispatch({ type: "DELETE_ORDER", payload: order.id });
        } else {
          console.log(err);
        }
      });

    // Show success notification
    setNotification({
      show: true,
      message:
        language === "en"
          ? "Order validated successfully!"
          : "تم التحقق من الطلب بنجاح!",
      type: "success",
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Reject order
  const rejectOrder = (order) => {
    let isDeleted = false;
    if (confirm("Are you sure you want to reject this order?")) {
      axios
        .delete(`${apiURL}/orders/${order.id}`)
        .then(() => {
          dispatch({ type: "DELETE_ORDER", payload: order.id });
          isDeleted = true;
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            console.log(
              "API not valid or not working, ignoring error and dispatching action."
            );
            dispatch({ type: "DELETE_ORDER", payload: order.id });
            isDeleted = true;
          } else {
            console.log(err);
          }
        });
      if (isDeleted) {
        setNotification({
          show: true,
          message: language === "en" ? "Order rejected!" : "تم رفض الطلب!",
          type: "error",
        });

        setTimeout(() => {
          setNotification({ show: false, message: "", type: "" });
        }, 3000);
      }
    }
  };

  return (
    <div
      className={`container mx-auto p-4 ${direction === "rtl" ? "rtl" : "ltr"}`}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {language === "en" ? "Orders Management" : "إدارة الطلبات"}
        </h1>
        <p className="text-muted-foreground">
          {language === "en"
            ? "View, validate or reject rental orders"
            : "عرض وتأكيد أو رفض طلبات التأجير"}
        </p>
      </div>

      {notification.show && (
        <Alert
          className={`mb-4 ${
            notification.type === "success"
              ? "bg-green-50 border-green-500"
              : "bg-red-50 border-red-500"
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

      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">
            {language === "en" ? "Pending" : "قيد الانتظار"}
          </TabsTrigger>
          {/* <TabsTrigger value="validated">
            {language === "en" ? "Validated" : "تم التحقق"}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            {language === "en" ? "Rejected" : "مرفوض"}
          </TabsTrigger> */}
          <TabsTrigger value="contracts">
            {language === "en" ? "Contracts" : "العقود"}
          </TabsTrigger>
        </TabsList>

        {/* Pending Orders */}
        <TabsContent value="pending">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orders
              .filter((order) => order.status === "pending")
              .map((order) => {
                const { car, user } = getOrderDetails(order);
                return (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {language === "en" ? "Order" : "طلب"} #{order.id}
                        </CardTitle>
                        <Badge>
                          {language === "en" ? "Pending" : "قيد الانتظار"}
                        </Badge>
                      </div>
                      <CardDescription>
                        {formatDate(order.startDate)} -{" "}
                        {formatDate(order.endDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {car?.name} {car?.model} ({car?.year})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{user?.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {calculateDays(order.startDate, order.endDate)}{" "}
                            {language === "en" ? "days" : "أيام"}
                          </span>
                        </div>
                        <div className="font-bold mt-2">
                          ${order.price}{" "}
                          {language === "en" ? "total" : "المجموع"}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            {language === "en" ? "Details" : "التفاصيل"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {language === "en"
                                ? "Order Details"
                                : "تفاصيل الطلب"}{" "}
                              #{order.id}
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
                                  {language === "en"
                                    ? "Car Details"
                                    : "تفاصيل السيارة"}
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
                                    <span className="font-medium">
                                      {language === "en" ? "Year" : "السنة"}:
                                    </span>{" "}
                                    {car?.year}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      {language === "en" ? "Type" : "النوع"}:
                                    </span>{" "}
                                    {car?.type}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      {language === "en"
                                        ? "Daily Rate"
                                        : "السعر اليومي"}
                                      :
                                    </span>{" "}
                                    ${car?.price}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">
                                  {language === "en"
                                    ? "Customer Details"
                                    : "تفاصيل العميل"}
                                </h3>
                                <div className="space-y-1 text-sm">
                                  <p>
                                    <span className="font-medium">
                                      {language === "en" ? "Name" : "الاسم"}:
                                    </span>{" "}
                                    {user?.name}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      {language === "en"
                                        ? "Email"
                                        : "البريد الإلكتروني"}
                                      :
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
                                      {language === "en"
                                        ? "Address"
                                        : "العنوان"}
                                      :
                                    </span>{" "}
                                    {user?.address}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">
                                {language === "en"
                                  ? "Rental Details"
                                  : "تفاصيل التأجير"}
                              </h3>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">
                                    {language === "en"
                                      ? "Start Date"
                                      : "تاريخ البدء"}
                                    :
                                  </span>{" "}
                                  {formatDate(order.startDate)}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    {language === "en"
                                      ? "End Date"
                                      : "تاريخ الانتهاء"}
                                    :
                                  </span>{" "}
                                  {formatDate(order.endDate)}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    {language === "en" ? "Duration" : "المدة"}:
                                  </span>{" "}
                                  {calculateDays(
                                    order.startDate,
                                    order.endDate
                                  )}{" "}
                                  {language === "en" ? "days" : "أيام"}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    {language === "en"
                                      ? "Total Price"
                                      : "السعر الإجمالي"}
                                    :
                                  </span>{" "}
                                  ${order.price}
                                </p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => rejectOrder(order)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              {language === "en" ? "Reject" : "رفض"}
                            </Button>
                            <Button onClick={() => validateOrder(order)}>
                              <Check className="h-4 w-4 mr-1" />
                              {language === "en" ? "Validate" : "تحقق"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => rejectOrder(order)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          {language === "en" ? "Reject" : "رفض"}
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => validateOrder(order)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          {language === "en" ? "Validate" : "تحقق"}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            {orders.filter((order) => order.status === "pending").length ===
              0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  {language === "en"
                    ? "No pending orders found"
                    : "لا توجد طلبات قيد الانتظار"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Validated Orders */}
        <TabsContent value="validated">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === "en" ? "Order ID" : "رقم الطلب"}
                </TableHead>
                <TableHead>
                  {language === "en" ? "Customer" : "العميل"}
                </TableHead>
                <TableHead>{language === "en" ? "Car" : "السيارة"}</TableHead>
                <TableHead>
                  {language === "en" ? "Dates" : "التواريخ"}
                </TableHead>
                <TableHead>{language === "en" ? "Price" : "السعر"}</TableHead>
                <TableHead>{language === "en" ? "Status" : "الحالة"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders
                .filter((order) => order.status === "validated")
                .map((order) => {
                  const { car, user } = getOrderDetails(order);
                  return (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell>
                        {car?.name} {car?.model}
                      </TableCell>
                      <TableCell>
                        {formatDate(order.startDate)} -{" "}
                        {formatDate(order.endDate)}
                      </TableCell>
                      <TableCell>${order.price}</TableCell>
                      <TableCell>
                        <Badge variant="success">
                          {language === "en" ? "Validated" : "تم التحقق"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {orders.filter((order) => order.status === "validated").length ===
                0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    {language === "en"
                      ? "No validated orders found"
                      : "لا توجد طلبات تم التحقق منها"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Rejected Orders */}
        <TabsContent value="rejected">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === "en" ? "Order ID" : "رقم الطلب"}
                </TableHead>
                <TableHead>
                  {language === "en" ? "Customer" : "العميل"}
                </TableHead>
                <TableHead>{language === "en" ? "Car" : "السيارة"}</TableHead>
                <TableHead>
                  {language === "en" ? "Dates" : "التواريخ"}
                </TableHead>
                <TableHead>{language === "en" ? "Price" : "السعر"}</TableHead>
                <TableHead>{language === "en" ? "Status" : "الحالة"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders
                .filter((order) => order.status === "rejected")
                .map((order) => {
                  const { car, user } = getOrderDetails(order);
                  return (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell>
                        {car?.name} {car?.model}
                      </TableCell>
                      <TableCell>
                        {formatDate(order.startDate)} -{" "}
                        {formatDate(order.endDate)}
                      </TableCell>
                      <TableCell>${order.price}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">
                          {language === "en" ? "Rejected" : "مرفوض"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {orders.filter((order) => order.status === "rejected").length ===
                0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    {language === "en"
                      ? "No rejected orders found"
                      : "لا توجد طلبات مرفوضة"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Contracts */}
        <TabsContent value="contracts">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === "en" ? "Contract ID" : "رقم العقد"}
                </TableHead>
                <TableHead>
                  {language === "en" ? "Customer" : "العميل"}
                </TableHead>
                <TableHead>{language === "en" ? "Car" : "السيارة"}</TableHead>
                <TableHead>
                  {language === "en" ? "Dates" : "التواريخ"}
                </TableHead>
                <TableHead>{language === "en" ? "Price" : "السعر"}</TableHead>
                <TableHead>
                  {language === "en" ? "Actions" : "الإجراءات"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => {
                const car = cars.find((car) => car.id === contract.carId);
                const user = users.find((user) => user.id === contract.userId);
                return (
                  <TableRow key={contract.id}>
                    <TableCell>#{contract.id}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>
                      {car?.name} {car?.model}
                    </TableCell>
                    <TableCell>
                      {formatDate(contract.startDate)} -{" "}
                      {formatDate(contract.endDate)}
                    </TableCell>
                    <TableCell>${contract.price}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" 
                      onClick={()=> navigate(`/dashboard/contracts/${contract.id}`)}>
                        <Eye className="h-4 w-4 mr-1" />
                        {language === "en" ? "View" : "عرض"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {contracts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    {language === "en" ? "No contracts found" : "لا توجد عقود"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
