import React from "react";
import { HiX, HiSun, HiMoon, HiRefresh } from "react-icons/hi";
import { useSettings } from "./SettingsContext"; // Import context

const Setting = ({ isOpen, toggleSettings }) => {
  const { theme, setTheme, unit, setUnit } = useSettings(); // Get settings from context

  const resetSettings = () => {
    setTheme("light");
    setUnit("Celsius");
    localStorage.removeItem("theme");
    localStorage.removeItem("unit");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Settings</h3>
          <button onClick={toggleSettings} className="text-gray-600 dark:text-gray-300 hover:text-red-500">
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Theme Selection */}
        <div className="mb-4">
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Theme</h4>
          <div className="flex items-center space-x-4 mt-2">
            <button
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              onClick={() => setTheme("light")}
            >
              <HiSun className="w-5 h-5 mr-2" /> Light
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              onClick={() => setTheme("dark")}
            >
              <HiMoon className="w-5 h-5 mr-2" /> Dark
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-6 flex justify-between">
          <button onClick={resetSettings} className="px-4 py-2 flex items-center bg-red-500 text-white rounded-lg hover:bg-red-600">
            <HiRefresh className="w-5 h-5 mr-2" />
            Reset Settings
          </button>
          <button onClick={toggleSettings} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
