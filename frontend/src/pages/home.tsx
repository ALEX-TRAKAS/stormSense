import React, { useState } from "react";
import Header from "../components/header";
import MapView from "../components/mapView";
import WeatherCard from "../components/weatherCard";
import { getWeather } from "../services/weather.service";
import type { WeatherResult } from "../services/weather.service";

export default function Home() {
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
    <>
      <Header />
      <div className="page-center">
        <main className="p-6 max-w-6xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="flex gap-2 mb-6 items-center max-w-md">
            <div className="search">
              <input  value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city…"type="text"/> 
              <button type="submit">Search</button>
            </div>
          </form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div>
            <WeatherCard
              weather={weather?.weather ?? null}
              loading={loading}
              error={error}
            />
          </div>
          <div className="map-container md:col-span-2">
            <MapView
              onSelect={handleMapSelect}
              weather={weather?.weather ?? null}
            />
          </div>

        
        </div>
      </main>
      </div>
    </>
  );
}
