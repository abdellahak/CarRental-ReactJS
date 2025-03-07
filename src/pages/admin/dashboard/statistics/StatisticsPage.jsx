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
      <div className="flex min-h-screen flex-col bg-gray-100">
        <div className="flex-1">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-gray-500">
                  Analytics and statistics for your car rental business
                </p>
              </div>
              <DateRangePicker
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>

            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cars">Cars</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
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
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Rentals
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
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Available Cars
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
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Pending Orders
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
                        +201 since last hour
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Revenue Overview</CardTitle>
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
                      <CardTitle>Revenue by Car Type</CardTitle>
                      <CardDescription>
                        Distribution of revenue across different car types
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
                      <CardTitle>Top Performing Cars</CardTitle>
                      <CardDescription>
                        Cars with the highest rental frequency
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TopPerformers contracts={contracts} cars={cars} />
                    </CardContent>
                  </Card>

                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Rental Duration Statistics</CardTitle>
                      <CardDescription>
                        Average rental duration by car model
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
                      <CardTitle>Car Availability</CardTitle>
                      <CardDescription>
                        Current availability status of your fleet
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CarAvailability cars={cars} />
                    </CardContent>
                  </Card>

                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Car Statistics</CardTitle>
                      <CardDescription>
                        Distribution by type, year, and model
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
                    <CardTitle>User Statistics</CardTitle>
                    <CardDescription>
                      User demographics and activity
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
                    <CardTitle>Order Statistics</CardTitle>
                    <CardDescription>Order status and trends</CardDescription>
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
