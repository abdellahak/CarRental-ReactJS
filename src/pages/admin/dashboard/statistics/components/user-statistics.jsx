"use client"

import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

export function UserStatistics({ users, contracts }) {
  const [roleData, setRoleData] = useState([])
  const [activityData, setActivityData] = useState([])

  useEffect(() => {
    // Process users data to get distribution by role
    const roleCount = {}

    users.forEach((user) => {
      if (!roleCount[user.role]) {
        roleCount[user.role] = 0
      }
      roleCount[user.role]++
    })

    // Convert to array
    const roleArray = Object.entries(roleCount).map(([role, count]) => ({
      name: role,
      value: count,
    }))

    setRoleData(roleArray)

    // Process contracts data to get user activity
    const userActivity = {}

    users.forEach((user) => {
      userActivity[user.id] = {
        name: user.name,
        count: 0,
      }
    })

    contracts.forEach((contract) => {
      if (userActivity[contract.userId]) {
        userActivity[contract.userId].count++
      }
    })

    // Convert to array and sort by count
    const activityArray = Object.values(userActivity)
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5) // Top 5 users

    setActivityData(activityArray)
  }, [users, contracts])

  const COLORS = ["#3b82f6", "#f59e0b"]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-sm font-medium mb-2">User Roles</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {roleData.map((entry, index) => (
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
        <h3 className="text-sm font-medium mb-2">Most Active Users</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData} layout="vertical">
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={100} />
              <Tooltip
                formatter={(value) => [value, "Rentals"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

