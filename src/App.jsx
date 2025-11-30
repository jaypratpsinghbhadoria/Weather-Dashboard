import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"
import { Toaster, toast } from "react-hot-toast"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import WeatherCard from "./components/WeatherCard"
import WeatherGraph from "./components/WeatherGraph"
import Forecast from "./components/Forecast"
import TodaysHighlights from "./components/TodaysHighlights"
import OtherCities from "./components/OtherCities"
import About from "./components/About"
import ForecastPage from "./components/ForecastPage"
import "./App.css"
import Analytics from "./components/Analytics"
import { SettingsProvider } from "./components/SettingsContext"; // Import the context provider
import Setting from "./components/Setting";
import Home from "./components/Home";

const API_KEY = "64a50d98c543deaa3972d08a76c4a050"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true" // Persist dark mode
  })
  const [searchCity, setSearchCity] = useState("")
  const [debouncedCity, setDebouncedCity] = useState("London") // Default city
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode) // Apply dark mode globally
    localStorage.setItem("darkMode", darkMode) // Save dark mode preference
  }, [darkMode])

  useEffect(() => {
    handleSearch("London") // Default city when the app loads
  }, [])

  const handleSearch = async (city) => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      toast.error("Please enter a city name.");
      return;
    }
  
    setDebouncedCity(trimmedCity);
    setLoading(true);
  
    try {
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?q=${trimmedCity}&units=metric&appid=${API_KEY}`
      );
      setWeather(weatherResponse.data);
  
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?q=${trimmedCity}&units=metric&appid=${API_KEY}`
      );
  
      console.log("🔍 API Forecast Response:", forecastResponse.data);
  
      const dailyData = forecastResponse.data.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!acc[date]) {
          acc[date] = {
            date: item.dt * 1000,
            maxTemp: item.main.temp_max,
            minTemp: item.main.temp_min,
            humidity: item.main.humidity || 0, // ✅ Extract humidity safely
            condition: item.weather[0].main,
          };
        } else {
          acc[date].maxTemp = Math.max(acc[date].maxTemp, item.main.temp_max);
          acc[date].minTemp = Math.min(acc[date].minTemp, item.main.temp_min);
          acc[date].humidity = Math.max(acc[date].humidity, item.main.humidity || 0); // ✅ Ensure correct humidity
        }
        return acc;
      }, {});
  
      const forecastData = Object.values(dailyData).slice(0, 3);
      setForecast(forecastData);
  
      console.log("✅ Processed Forecast Data:", forecastData);
  
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchCity)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev) // Toggle dark mode
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const graphData = weather
    ? Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        temp: Math.round(weather.main.temp + Math.sin(i / 4) * 2),
      }))
    : []

  return (
    <SettingsProvider>
    <Router>
      {/* Ensure the whole app wrapper gets dark mode */}
      <div className={`flex h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} darkMode={darkMode} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            handleSearch={() => handleSearch(searchCity)}
            handleKeyPress={handleKeyPress} // Pass down Enter key event
            toggleSidebar={toggleSidebar}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      weather={weather}
                      forecast={forecast}
                      loading={loading}
                      darkMode={darkMode}
                      graphData={graphData}
                    />
                  }
                />
                <Route path="/about" element={<About darkMode={darkMode} />} />
                <Route path="/Forecast" element={<ForecastPage city={debouncedCity} darkMode={darkMode} />} />
                <Route path="/analytics" element={<Analytics weather={weather} forecast={forecast} darkMode={darkMode} />} />
                <Route path="/setting" element={<Setting darkMode={darkMode} />} />
              </Routes>
            </div>
          </main>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
    </SettingsProvider>
  )
}

export default App
