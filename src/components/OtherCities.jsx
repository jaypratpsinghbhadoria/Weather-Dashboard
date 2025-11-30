import React, { useEffect, useState } from "react"
import { WiDaySunny, WiRain, WiCloudy } from "react-icons/wi"
import axios from "axios"

const API_KEY = "64a50d98c543deaa3972d08a76c4a050"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const cities = [
  { name: "London", condition: "Clear" },
  { name: "New York", condition: "Cloudy" },
  { name: "Mumbai", condition: "Rain" },
  { name: "Paris", condition: "Clear" },
]

const getWeatherIcon = (condition) => {
  switch (condition) {
    case "Clear":
      return <WiDaySunny className="w-8 h-8 text-yellow-500" />
    case "Rain":
      return <WiRain className="w-8 h-8 text-blue-500" />
    default:
      return <WiCloudy className="w-8 h-8 text-gray-500" />
  }
}

const OtherCities = ({ loading }) => {
  const [cityWeather, setCityWeather] = useState([])

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          cities.map((city) => axios.get(`${BASE_URL}/weather?q=${city.name}&units=metric&appid=${API_KEY}`)),
        )

        const weatherData = responses.map((response, index) => ({
          name: cities[index].name,
          temp: response.data.main.temp,
          condition: response.data.weather[0].main,
        }))

        setCityWeather(weatherData)
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${loading ? "animate-pulse" : "animate-fadeIn"}`}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Other Cities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading
          ? [1, 2, 3, 4].map((i) => <div key={i} className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>)
          : cityWeather.map((city) => (
              <div
                key={city.name}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{city.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{city.condition}</p>
                </div>
                <div className="flex items-center">
                  {getWeatherIcon(city.condition)}
                  <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                    {Math.round(city.temp)}°C
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default OtherCities

