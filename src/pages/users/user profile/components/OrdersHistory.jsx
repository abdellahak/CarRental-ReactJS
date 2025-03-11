import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, DollarSign, AlertCircle } from "lucide-react";
import { useMemo } from "react";

export default function OrderHistory() {
  // Safely access Redux store
  const authState = useSelector((state) => state.auth) || { user: null };
  const user = authState.user || {};

  const orders = useSelector((state) => state.orders) || [];
  const cars = useSelector((state) => state.cars) || [];

  const languageState = useSelector((state) => state.language) || {
    language: "en",
  };
  const language = languageState.language || "en";

  // Filter orders for the current user
  const userOrders = useMemo(() => {
    return orders.filter((order) => order.userId === user.id);
  }, [orders, user.id]);

  // Translations
  const translations = {
    en: {
      title: "Orders History",
      description: "View all your past and current orders",
      noOrders: "You don't have any orders yet",
      car: "Car",
      dates: "Rental Period",
      price: "Price",
      status: "Status",
      pending: "Pending",
      completed: "Completed",
      cancelled: "Cancelled",
      to: "to",
      perDay: "per day",
    },
    ar: {
      title: "سجل الطلبات",
      description: "عرض جميع طلباتك السابقة والحالية",
      noOrders: "ليس لديك أي طلبات حتى الآن",
      car: "السيارة",
      dates: "فترة الإيجار",
      price: "السعر",
      status: "الحالة",
      pending: "قيد الانتظار",
      completed: "مكتمل",
      cancelled: "ملغي",
      to: "إلى",
      perDay: "في اليوم",
    },
  };

  const t = translations[language] || translations.en;

  // Function to get car details by ID
  const getCarById = (carId) => {
    return cars.find((car) => car.id === carId) || {};
  };

  // Function to format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    } catch (error) {
      return dateString;
    }
  };

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">{t.completed}</Badge>;
      case "cancelled":
        return <Badge variant="destructive">{t.cancelled}</Badge>;
      case "pending":
      default:
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-500"
          >
            {t.pending}
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {userOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{t.noOrders}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.car}</TableHead>
                <TableHead>{t.dates}</TableHead>
                <TableHead>{t.price}</TableHead>
                <TableHead>{t.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userOrders.map((order) => {
                const car = getCarById(order.carId);
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden">
                          <img
                            src={
                              car.image || "/placeholder.svg?height=48&width=48"
                            }
                            alt={`${car.name} ${car.model}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p>
                            {car.name} {car.model}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {car.year}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {formatDate(order.startDate)} {t.to}{" "}
                          {formatDate(order.endDate)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{order.price}</span>
                        MAD
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
