import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function RevenueByCarType({ contracts, cars }) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Process contracts and cars data to get revenue by car type
    const revenueByType = {}

    contracts.forEach((contract) => {
      const car = cars.find((car) => car.id === contract.carId)
      if (car) {
        const type = car.type
        if (!revenueByType[type]) {
          revenueByType[type] = {
            type: type,
            value: 0,
          }
        }

        revenueByType[type].value += Number.parseInt(contract.price)
      }
    })

    // Convert to array
    setData(Object.values(revenueByType))
  }, [contracts, cars])

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

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
            nameKey="type"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${value}`, "Revenue"]}
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

