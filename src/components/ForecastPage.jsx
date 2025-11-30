import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

const API_KEY = "64a50d98c543deaa3972d08a76c4a050"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const ForecastPage = ({ city = "London" }) => {
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchForecast(city)
  }, [city])

  const fetchForecast = async (city) => {
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`)
      const dailyForecasts = response.data.list.filter((item) => item.dt_txt.includes("12:00:00"))

      setForecast(dailyForecasts)
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message)
      toast.error("Error fetching advanced forecast.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">7-Day Advanced Forecast</h2>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
      ) : (
        <div className="space-y-4">
          {forecast.map((day) => (
            <div key={day.dt} className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-lg font-semibold">{new Date(day.dt * 1000).toDateString()}</p>
              <p className="text-gray-700 dark:text-gray-300">🌡 {Math.round(day.main.temp)}°C</p>
              <p className="text-gray-700 dark:text-gray-300">🌤 {day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ForecastPage
