import React, { useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";

// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = ({ forecast }) => {
  useEffect(() => {
    console.log("🔍 Received Forecast Data in Analytics:", forecast);
    if (forecast && forecast.length > 0) {
      forecast.forEach((day, index) => {
        console.log(`📅 Day ${index + 1}:`, day);
      });
    }
  }, [forecast]);

  if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 dark:text-gray-300">No forecast data available</p>
      </div>
    );
  }

  const temperatureData = {
    labels: forecast.map((day) =>
      new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    ),
    datasets: [
      {
        label: "Max Temperature (°C)",
        data: forecast.map((day) => day.maxTemp),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Min Temperature (°C)",
        data: forecast.map((day) => day.minTemp),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const humidityData = {
    labels: forecast.map((day) =>
      new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    ),
    datasets: [
      {
        label: "Humidity (%)",
        data: forecast.map((day) => (typeof day.humidity === "number" ? day.humidity : 0)),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false }, beginAtZero: true, ticks: { stepSize: 10 } },
    },
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Weather Analytics</h2>

      {/* Temperature Line Chart */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Temperature Trends</h3>
        <div className="h-80 w-full">
          <Line data={temperatureData} options={chartOptions} />
        </div>
      </div>

      {/* Humidity Bar Chart */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Humidity Levels</h3>
        <div className="h-80 w-full">
          <Bar data={humidityData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
