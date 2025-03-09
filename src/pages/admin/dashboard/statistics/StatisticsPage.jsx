import { useSelector } from "react-redux";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RevenueOverview } from "./components/revenue-overview";
import { CarStatistics } from "./components/car-statistics";
import { UserStatistics } from "./components/user-statistics";
import { OrderStatistics } from "./components/order-statistics";
import { TopPerformers } from "./components/top-performers";
import { RevenueByCarType } from "./components/revenue-by-car-type";
import { RentalDurationStats } from "./components/rental-duration-stats";
import { CarAvailability } from "./components/car-availability";
import { DateRangePicker } from "./components/date-range-picker";

export default function StatisticsPage() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders);
  const contracts = useSelector((state) => state.contracts);
  const cars = useSelector((state) => state.cars);
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 3, 30),
  });
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
        <div className="flex-1">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {isEnglish ? "Dashboard" : "لوحة التحكم"}
                </h1>
                <p className="text-gray-500">
                  {isEnglish
                    ? "Analytics and statistics for your car rental business"
                    : "تحليلات وإحصاءات لأعمال تأجير السيارات الخاصة بك"}
                </p>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid w-full grid-cols-4 dark:bg-white/[0.03]">
                <TabsTrigger value="overview">
                  {isEnglish ? "Overview" : "نظرة عامة"}
                </TabsTrigger>
                <TabsTrigger value="cars">
                  {isEnglish ? "Cars" : "السيارات"}
                </TabsTrigger>
                <TabsTrigger value="users">
                  {isEnglish ? "Users" : "المستخدمين"}
                </TabsTrigger>
                <TabsTrigger value="orders">
                  {isEnglish ? "Orders" : "الطلبات"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {isEnglish ? "Total Revenue" : "إجمالي الإيرادات"}
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-gray-500"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-gray-500">
                        {isEnglish
                          ? "+20.1% from last month"
                          : "+20.1% من الشهر الماضي"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {isEnglish ? "Active Rentals" : "الإيجارات النشطة"}
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-gray-500"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2350</div>
                      <p className="text-xs text-gray-500">
                        {isEnglish
                          ? "+180.1% from last month"
                          : "+180.1% من الشهر الماضي"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {isEnglish ? "Available Cars" : "السيارات المتاحة"}
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-gray-500"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">7</div>
                      <p className="text-xs text-gray-500">
                        {isEnglish ? "+19% from last month" : "+19% من الشهر الماضي"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {isEnglish ? "Pending Orders" : "الطلبات المعلقة"}
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-gray-500"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4</div>
                      <p className="text-xs text-gray-500">
                        {isEnglish ? "+201 since last hour" : "+201 منذ الساعة الماضية"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>
                        {isEnglish ? "Revenue Overview" : "نظرة عامة على الإيرادات"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <RevenueOverview
                        contracts={contracts}
                        dateRange={dateRange}
                      />
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>
                        {isEnglish ? "Revenue by Car Type" : "الإيرادات حسب نوع السيارة"}
                      </CardTitle>
                      <CardDescription>
                        {isEnglish
                          ? "Distribution of revenue across different car types"
                          : "توزيع الإيرادات عبر أنواع السيارات المختلفة"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RevenueByCarType contracts={contracts} cars={cars} />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>
                        {isEnglish ? "Top Performing Cars" : "أفضل السيارات أداءً"}
                      </CardTitle>
                      <CardDescription>
                        {isEnglish
                          ? "Cars with the highest rental frequency"
                          : "السيارات ذات أعلى تردد للإيجار"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TopPerformers contracts={contracts} cars={cars} />
                    </CardContent>
                  </Card>

                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>
                        {isEnglish
                          ? "Rental Duration Statistics"
                          : "إحصاءات مدة الإيجار"}
                      </CardTitle>
                      <CardDescription>
                        {isEnglish
                          ? "Average rental duration by car model"
                          : "متوسط مدة الإيجار حسب طراز السيارة"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RentalDurationStats contracts={contracts} cars={cars} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="cars" className="space-y-4 mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>
                        {isEnglish ? "Car Availability" : "توفر السيارات"}
                      </CardTitle>
                      <CardDescription>
                        {isEnglish
                          ? "Current availability status of your fleet"
                          : "حالة التوفر الحالية لأسطولك"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CarAvailability cars={cars} />
                    </CardContent>
                  </Card>

                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>
                        {isEnglish ? "Car Statistics" : "إحصاءات السيارات"}
                      </CardTitle>
                      <CardDescription>
                        {isEnglish
                          ? "Distribution by type, year, and model"
                          : "التوزيع حسب النوع والسنة والطراز"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CarStatistics cars={cars} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="users" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isEnglish ? "User Statistics" : "إحصاءات المستخدمين"}
                    </CardTitle>
                    <CardDescription>
                      {isEnglish
                        ? "User demographics and activity"
                        : "التركيبة السكانية للمستخدمين والنشاط"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserStatistics users={users} contracts={contracts} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isEnglish ? "Order Statistics" : "إحصاءات الطلبات"}
                    </CardTitle>
                    <CardDescription>
                      {isEnglish ? "Order status and trends" : "حالة الطلبات والاتجاهات"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OrderStatistics orders={orders} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
