"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useSelector } from "react-redux"

export function CarStatistics({ cars }) {
  const language = useSelector((state) => state.language.language)
  const isEnglish = language === "en";
  const [typeData, setTypeData] = useState([])
  const [yearData, setYearData] = useState([])

  useEffect(() => {
    // Process cars data to get distribution by type
    const typeCount = {}
    const yearCount = {}

    cars.forEach((car) => {
      // Count by type
      if (!typeCount[car.type]) {
        typeCount[car.type] = 0
      }
      typeCount[car.type]++

      // Count by year
      if (!yearCount[car.year]) {
        yearCount[car.year] = 0
      }
      yearCount[car.year]++
    })

    // Convert to array
    const typeArray = Object.entries(typeCount).map(([type, count]) => ({
      name: type,
      count: count,
    }))

    const yearArray = Object.entries(yearCount)
      .map(([year, count]) => ({
        name: year,
        count: count,
      }))
      .sort((a, b) => a.name - b.name)

    setTypeData(typeArray)
    setYearData(yearArray)
  }, [cars])

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">{isEnglish ? "Distribution by Type" : "التوزيع حسب النوع"}</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={typeData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(value) => [value, isEnglish ? "Count" : "العدد"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">{isEnglish ? "Distribution by Year" : "التوزيع حسب السنة"}</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(value) => [value, isEnglish ? "Count" : "العدد"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
