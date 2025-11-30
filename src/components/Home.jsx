import WeatherCard from "./WeatherCard";
import OtherCities from "./OtherCities";
import TodaysHighlights from "./TodaysHighlights";
import Forecast from "./Forecast";
import WeatherGraph from "./WeatherGraph";

const Home = ({ weather, forecast, loading, darkMode, graphData }) => (
  <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WeatherCard weather={weather} loading={loading} darkMode={darkMode} />
      <OtherCities loading={loading} darkMode={darkMode} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TodaysHighlights weather={weather} loading={loading} darkMode={darkMode} />
      <Forecast forecast={forecast} loading={loading} darkMode={darkMode} />
    </div>
    <WeatherGraph data={graphData} loading={loading} darkMode={darkMode} />
  </>
);

export default Home;
