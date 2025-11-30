import React from "react"
import { AreaChart, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const WeatherGraph = ({ data, loading }) => {
  const processData = (data) => {
    const processedData = []
    const startTime = 0
    const endTime = 23

    for (let hour = startTime; hour <= endTime; hour++) {
      const formattedTime = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`

      const existingEntry = data.find((entry) => entry.time === `${hour}:00`)

      if (existingEntry) {
        processedData.push({
          ...existingEntry,
          time: formattedTime,
        })
      } else {
        processedData.push({
          time: formattedTime,
          temp: null,
        })
      }
    }

    return processedData
  }

  const normalizedData = processData(data)

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${loading ? "animate-pulse" : "animate-fadeIn"}`}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Temperature Trend</h3>
      {loading ? (
        <div className="h-64 sm:h-80 bg-gray-300 dark:bg-gray-700 rounded"></div>
      ) : (
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={normalizedData}>
              <defs>
                <linearGradient id="tempColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b7280" stopOpacity={0.8} /> {/* Dark Gray */}
                  <stop offset="95%" stopColor="#6b7280" stopOpacity={0} /> {/* Transparent Gray */}
                </linearGradient>
              </defs>

              <XAxis
                dataKey="time"
                interval="preserveStartEnd"
                tickCount={6}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                axisLine={true}
                tickLine={true}
                domain={["auto", "auto"]}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "none",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
              <Area type="monotone" dataKey="temp" stroke="#3b82f6" fillOpacity={1} fill="url(#tempColor)" />
              <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={true} 
                  activeDot={{ r: 6 }} 
              />

            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default WeatherGraph

