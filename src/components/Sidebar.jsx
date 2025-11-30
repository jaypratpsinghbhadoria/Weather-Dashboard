import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiHome, HiInformationCircle, HiChartBar, HiCog, HiX } from "react-icons/hi";
import { WiDaySunny } from "react-icons/wi";
import Setting from "./Setting"; // Import the Settings component

const menuItems = [
  { icon: HiHome, label: "Home", path: "/" },
  { icon: HiInformationCircle, label: "About", path: "/about" },
  { icon: WiDaySunny, label: "Forecast", path: "/forecast" },
  { icon: HiChartBar, label: "Analytics", path: "/analytics" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Weather App</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
            >
              <HiX className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white font-bold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <item.icon className="w-6 h-6 mr-3" />
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {/* Settings Button */}
              <li>
                <button
                  onClick={toggleSettings}
                  className="flex w-full items-center p-3 rounded-lg transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <HiCog className="w-6 h-6 mr-3" />
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Settings Modal */}
      <Setting isOpen={isSettingsOpen} toggleSettings={toggleSettings} />
    </>
  );
};

export default Sidebar;
