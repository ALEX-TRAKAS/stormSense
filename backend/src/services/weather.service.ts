import axios from "axios";
import { WeatherCache } from "./weatherCache.service";
import { pool } from "../db/db";

export class WeatherService {
  static async getCoordinates(location: string) {
    const geoRes = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      { params: { name: location, count: 1 } }
    );

    const results = geoRes.data.results;
    if (!results || results.length === 0) return null;

    return {
      lat: results[0].latitude,
      lon: results[0].longitude
    };
  }

  static async fetchWeather(lat: number, lon: number) {
    console.log(`Fetching weather for lat: ${lat}, lon: ${lon}`);
    const weatherRes = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: "true"
      }
    });
    console.log("Fetched weather from API:", weatherRes.data);

    return weatherRes.data;
  }

  static async saveWeatherToDB(location: string, weather: any) {
    return pool.query(
      `INSERT INTO weather_history (location, temperature, humidity, wind, data)
       VALUES ($1,$2,$3,$4,$5)`,
      [
        location,
        weather.current_weather.temperature,
        null, 
        weather.current_weather.windspeed,
        weather
      ]
    );
  }

  static async getWeather(lat?: number, lon?: number, location?: string) {
    const cacheKey = location || `${lat},${lon}`;

    const cached = await WeatherCache.get(cacheKey);
    if (cached) return { source: "cache", weather: cached };

  
    let coords = { lat, lon };

    if (location) {
      const geo = await this.getCoordinates(location);
      if (!geo) throw new Error(`City "${location}" not found`);
      coords = geo;
    }

    const weather = await this.fetchWeather(coords.lat!, coords.lon!);

    await WeatherCache.set(cacheKey, weather);
    await this.saveWeatherToDB(location || cacheKey, weather);

    return { source: "api", weather };
  }
}
