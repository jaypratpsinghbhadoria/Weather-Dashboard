import React, { useEffect, useState } from "react"
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

const WeatherCard = ({ weather, loading }) => {
  const [cityPhoto, setCityPhoto] = useState(null)

  const UNSPLASH_API_KEY = "zfot8ee09EYEksNcnqlOTmHefzYRJQhTQNvIc3GdR9E"

  useEffect(() => {
    if (weather) {
      fetch(`https://api.unsplash.com/search/photos?query=${weather.name}&client_id=${UNSPLASH_API_KEY}&per_page=1`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setCityPhoto(data.results[0].urls.regular)
          } else {
            setCityPhoto(null)
          }
        })
        .catch((error) => {
          console.error("Error fetching city photo:", error)
          setCityPhoto(null)
        })
    }
  }, [weather])

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-6">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!weather) return null

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${
        loading ? "animate-pulse" : "animate-fadeIn"
      }`}
    >
      {cityPhoto && (
        <div className="relative h-48">
          <img
            src={cityPhoto || "/placeholder.svg"}
            alt={`${weather.name} city`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-bold">{weather.name}</h2>
            <p className="text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-6xl font-bold text-gray-900 dark:text-white">{Math.round(weather.main.temp)}°C</div>
          <div className="text-right">
            <div className="flex items-center justify-end mb-1">
              <FaArrowUp className="text-red-500 w-4 h-4 mr-1" />
              <span className="font-semibold text-gray-900 dark:text-white">{Math.round(weather.main.temp_max)}°C</span>
            </div>
            <div className="flex items-center justify-end">
              <FaArrowDown className="text-blue-500 w-4 h-4 mr-1" />
              <span className="font-semibold text-gray-900 dark:text-white">{Math.round(weather.main.temp_min)}°C</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <WiHumidity className="w-8 h-8 text-blue-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="font-semibold text-gray-900 dark:text-white">{weather.main.humidity}%</p>
          </div>
          <div className="flex flex-col items-center">
            <WiStrongWind className="w-8 h-8 text-green-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
            <p className="font-semibold text-gray-900 dark:text-white">{weather.wind.speed} m/s</p>
          </div>
          <div className="flex flex-col items-center">
            <WiBarometer className="w-8 h-8 text-purple-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
            <p className="font-semibold text-gray-900 dark:text-white">{weather.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard

