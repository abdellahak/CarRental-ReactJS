"use client"

import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function CarAvailability({ cars }) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Count available and unavailable cars
    let available = 0
    let unavailable = 0

    cars.forEach((car) => {
      if (car.available) {
        available++
      } else {
        unavailable++
      }
    })

    setData([
      { name: "Available", value: available },
      { name: "Unavailable", value: unavailable },
    ])
  }, [cars])

  const COLORS = ["#10b981", "#ef4444"]

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
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
  )
}

