import React from "react"
import { WiDaySunny, WiRain, WiCloudy } from "react-icons/wi"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

const getWeatherIcon = (condition) => {
  switch (condition) {
    case "Clear":
      return <WiDaySunny className="w-10 h-10 text-yellow-500" />
    case "Rain":
      return <WiRain className="w-10 h-10 text-blue-500" />
    default:
      return <WiCloudy className="w-10 h-10 text-gray-500" />
  }
}

const Forecast = ({ forecast, loading }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${loading ? "animate-pulse" : "animate-fadeIn"}`}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3-Day Forecast</h3>
      <div className="space-y-4">
        {loading
          ? [1, 2, 3].map((i) => <div key={i} className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>)
          : forecast?.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {getWeatherIcon(day.condition)}
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{day.condition}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <FaArrowUp className="text-red-500 w-4 h-4 mr-1" />
                    <span className="font-semibold text-gray-900 dark:text-white">{Math.round(day.maxTemp)}°C</span>
                  </div>
                  <div className="flex items-center">
                    <FaArrowDown className="text-blue-500 w-4 h-4 mr-1" />
                    <span className="font-semibold text-gray-900 dark:text-white">{Math.round(day.minTemp)}°C</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default Forecast

