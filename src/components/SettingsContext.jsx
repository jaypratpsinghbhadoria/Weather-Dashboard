import React, { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "Celsius");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, unit, setUnit }}>
      {children}
    </SettingsContext.Provider>
  );
};
