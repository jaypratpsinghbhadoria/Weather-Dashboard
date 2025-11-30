import React from "react"
import { WiSunrise, WiSunset, WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from "react-icons/wi"

const HighlightCard = ({ title, value, unit, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
    <div className="flex items-center mb-2">
      <Icon className={`w-8 h-8 ${color}`} />
      <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">{title}</span>
    </div>
    <div className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
      {value}
      <span className="text-sm ml-1">{unit}</span>
    </div>
  </div>
)

const TodaysHighlights = ({ weather, loading }) => {
  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!weather) return null

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div
      className={`bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 ${
        loading ? "animate-pulse" : "animate-fadeIn"
      }`}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Today's Highlights</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>)
          : [
              {
                title: "Feels Like",
                value: Math.round(weather.main.feels_like),
                unit: "°C",
                icon: WiThermometer,
                color: "text-red-500",
              },
              {
                title: "Humidity",
                value: weather.main.humidity,
                unit: "%",
                icon: WiHumidity,
                color: "text-blue-500",
              },
              {
                title: "Wind Speed",
                value: weather.wind.speed,
                unit: "m/s",
                icon: WiStrongWind,
                color: "text-green-500",
              },
              {
                title: "Pressure",
                value: weather.main.pressure,
                unit: "hPa",
                icon: WiBarometer,
                color: "text-purple-500",
              },
              {
                title: "Sunrise",
                value: sunrise,
                unit: "",
                icon: WiSunrise,
                color: "text-yellow-500",
              },
              {
                title: "Sunset",
                value: sunset,
                unit: "",
                icon: WiSunset,
                color: "text-orange-500",
              },
            ].map((item, index) => (
              <HighlightCard
                key={index}
                title={item.title}
                value={item.value}
                unit={item.unit}
                icon={item.icon}
                color={item.color}
              />
            ))}
      </div>
    </div>
  )
}

export default TodaysHighlights

