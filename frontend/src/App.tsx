import React, { useState } from "react";
import MapView from "./components/mapView";
import WeatherCard from "./components/weatherCard";
import { getWeather } from "./services/weather.service";
import type { WeatherResult } from "./services/weather.service";

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city?: string, lat?: number, lon?: number) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getWeather({ city, lat, lon });
      setWeather(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    fetchWeather(query);
  };

  const handleMapSelect = (lat: number, lon: number) => {
    fetchWeather(undefined, lat, lon);
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Weather Map</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="City name"
            aria-label="search"
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main className="main-grid">
        <section className="map-column">
          <MapView
            onSelect={handleMapSelect}
            weather={weather?.weather ?? null}
          />
        </section>

        <aside className="side-column">
          <WeatherCard
            weather={weather?.weather ?? null}
            loading={loading}
            error={error}
          />
        </aside>
      </main>
    </div>
  );
}
