import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Line, LineChart, XAxis, YAxis } from "recharts"

export function OrderStatistics({ orders }) {
  const [statusData, setStatusData] = useState([])
  const [trendData, setTrendData] = useState([])

  useEffect(() => {
    // Process orders data to get distribution by status
    const statusCount = {}

    orders.forEach((order) => {
      if (!statusCount[order.status]) {
        statusCount[order.status] = 0
      }
      statusCount[order.status]++
    })

    // Convert to array
    const statusArray = Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count,
    }))

    setStatusData(statusArray)

    // Process orders data to get monthly trends
    const monthlyData = {}

    orders.forEach((order) => {
      const startDate = new Date(order.startDate)
      const month = startDate.toLocaleString("default", { month: "short" })
      const year = startDate.getFullYear()
      const key = `${month} ${year}`

      if (!monthlyData[key]) {
        monthlyData[key] = {
          name: key,
          count: 0,
          date: startDate,
        }
      }

      monthlyData[key].count++
    })

    // Convert to array and sort by date
    const trendArray = Object.values(monthlyData).sort((a, b) => a.date - b.date)

    setTrendData(trendArray)
  }, [orders])

  const COLORS = ["#3b82f6", "#10b981", "#ef4444"]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Order Status</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [value, "Count"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Order Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(value) => [value, "Orders"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

