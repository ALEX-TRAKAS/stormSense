import type { WeatherData } from "../services/weather.service";
import { formatDate } from "../utils/formatDate";
import "../styles/weatherCardStyle.css";
import { weatherCodeToIcon } from '../utils/weatherIcons';
import type { IconType } from 'react-icons';

interface WeatherIconProps {
  code: number | string;
  size?: number; 
  className?: string; 
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, size = 40, className }) => {
  const Icon: IconType = weatherCodeToIcon[code.toString()];

  if (!Icon) return <span>❓</span>; 

  return <Icon size={size} className={className} />;
};

export default function WeatherCard({
  weather,
  loading,
  error,
}: {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}) {
  if (loading) return <div className="card">φόρτωση...</div>;
  if (error) return <div className="card error">Error: {error}</div>;
  if (!weather)
    return (
      <div className="label">Δεν έχει επιλεγεί τοποθεσία — αναζητήστε ή κάντε κλικ στον χάρτη.</div>
    );

  return (
    <div className="card">
      <div className="container">
      <WeatherIcon code={weather?.current.weather_code} size={100} className="text-blue-500" />
      </div>

      <div className="card-header">
        <span>{weather?.location || "Unknown Location"}</span>
        <span>{formatDate(weather?.current.time)}</span>
      </div>
        <span className="temp">Θερμοκρασία: {weather?.current.temperature_2m || 0}°C</span>
        <br></br>
      <div className="additional-info">
        <span className="humidity">Υγρασία: {weather?.current.relative_humidity_2m}%</span>
        <br></br>
        <span className="wind">Ταχύτητα Ανέμου: {weather?.current.wind_speed_10m} m/s</span>
        <br></br>
        <span className="cloud-cover">Νεφοκάλυψη: {weather?.current.cloud_cover}%</span>
        <br></br>
        <span className="apparent-temp">Αισθητή Θερμοκρασία: {weather?.current.apparent_temperature}°C</span>
        <br></br>
        <span className="wind-direction">Κατεύθυνση Ανέμου: {weather?.current.wind_direction_10m}°</span>
      </div>
    </div>
  );
}
