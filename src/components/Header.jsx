import React from "react"
import { HiMoon, HiSun, HiBell, HiSearch, HiMenu } from "react-icons/hi"

const Header = ({ darkMode, toggleDarkMode, searchCity, setSearchCity, handleSearch, toggleSidebar }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
          >
            <HiMenu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
          <div className="relative max-w-xl w-full">
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search for a city..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <HiSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center ml-4 space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {darkMode ? <HiSun className="w-6 h-6 text-yellow-500" /> : <HiMoon className="w-6 h-6 text-gray-500" />}
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <HiBell className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header

