import React from "react"

const About = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Weather App</h1>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Welcome to the Weather App! Our goal is to provide real-time, accurate weather forecasts with a clean and intuitive UI.
        With detailed analytics, interactive weather predictions, and user-friendly settings, you can stay ahead of any climate changes.
      </p>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">Key Features</h2>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
        <li>🌍 Real-time global weather updates</li>
        <li>📊 Advanced analytics for tracking temperature and humidity trends</li>
        <li>☀️ Weekly and hourly forecasts</li>
        <li>⚙️ Customizable user settings</li>
      </ul>
      <p className="text-gray-700 dark:text-gray-300 mt-4">
        Built with React, Tailwind CSS, and weather APIs, our app ensures a smooth user experience. Explore the weather in your city today!
      </p>
    </div>
  )
}

export default About;
