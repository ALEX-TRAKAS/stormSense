import type { WeatherData } from "../services/weather.service";


export default function WeatherCard({ weather, loading, error }: { weather: WeatherData | null; loading: boolean; error: string | null; }) {
if (loading) return <div className="card">Loading...</div>;
if (error) return <div className="card error">Error: {error}</div>;
if (!weather) return <div className="card">No weather selected — search or click the map.</div>;


return (
<div className="card">
{/* <h2>{weather.location}</h2>
<div className="row"><strong>{weather.temp}°C</strong></div>
<div className="row">Humidity: {weather.humidity}%</div>
<div className="row">Wind: {weather.wind} m/s</div> */}
<details>
<summary>Raw data</summary>
<pre className="raw">{JSON.stringify(weather, null, 2)}</pre>
</details>
</div>
);
}
