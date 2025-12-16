import type { WeatherData } from "../services/weather.service";
import { formatDate } from "../utils/formatdate";
import "../styles/weatherCardStyle.css";

export default function WeatherCard({
  weather,
  loading,
  error,
}: {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}) {
  if (loading) return <div className="card">Loading...</div>;
  if (error) return <div className="card error">Error: {error}</div>;
  if (!weather)
    return (
      <div className="card">No weather selected — search or click the map.</div>
    );

  return (
    <div className="card">
      <div className="container">
        {/* todo: add weather icons */}
      </div>

      <div className="card-header">
        <span>{weather?.location || "Unknown Location"}</span>
        <span>{formatDate(weather?.current.time)}</span>
      </div>
        <span className="humidity">Υγρασία: {weather?.current.relative_humidity_2m}%</span>
        <span className="temp">{weather?.current.temperature_2m || 0}°C</span>
        <span className="wind">{weather?.current.wind_speed_10m} m/s</span>
    </div>
  );
}
