"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function RevenueOverview({ contracts, dateRange }) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Process contracts data to get monthly revenue
    const monthlyData = {}

    contracts.forEach((contract) => {
      const startDate = new Date(contract.startDate)
      const month = startDate.toLocaleString("default", { month: "short" })
      const year = startDate.getFullYear()
      const key = `${month} ${year}`

      if (!monthlyData[key]) {
        monthlyData[key] = {
          name: key,
          revenue: 0,
          date: startDate,
        }
      }

      monthlyData[key].revenue += Number.parseInt(contract.price)
    })

    // Convert to array and sort by date
    const sortedData = Object.values(monthlyData)
      .filter((item) => {
        const date = item.date
        return date >= dateRange.from && date <= dateRange.to
      })
      .sort((a, b) => a.date - b.date)

    setData(sortedData)
  }, [contracts, dateRange])

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} tickMargin={10} />
          <Tooltip
            formatter={(value) => [`$${value}`, "Revenue"]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

