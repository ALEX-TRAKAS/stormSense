import axios from "axios";
import { WeatherCache } from "./weatherCache.service";
import { pool } from "../db/db";
import dotenv from "dotenv";
dotenv.config();
import config from "../config/config";

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
      lon: results[0].longitude,
    };
  }

  static async fetchLocation(lat: number, lon: number) {
    const locationRes = await axios.get("https://geocode.maps.co/reverse", {
      params: {
        lat,
        lon,
        api_key: config.geocodingApiKey,
      },
    });

    const data = locationRes.data;

    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.display_name ||
      null
    );
  }
  static async fetchCurrentWeather(lat: number, lon: number) {
    const location = await this.fetchLocation(lat, lon);

    const weatherRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=relative_humidity_2m,temperature_2m,is_day,apparent_temperature,snowfall,showers,rain,precipitation,weather_code,cloud_cover,wind_direction_10m,wind_speed_10m`
    );

    weatherRes.data.location = location;
    return weatherRes.data;
  }

  static async saveWeatherToDB(location: string, weather: any) {
    return pool.query(
      `INSERT INTO weather_history (location, temperature, humidity, wind, data)
       VALUES ($1,$2,$3,$4,$5)`,
      [
        location,
        weather.current.temperature_2m || null,
        weather.current.relative_humidity_2m || null,
        weather.current.wind_speed_10m,
        weather,
      ]
    );
  }

  static async getWeather(lat?: number, lon?: number, location?: string) {
    const cacheKey = location || `${lat?.toPrecision(4)},${lon?.toPrecision(4)}`;

    const cached = await WeatherCache.get(cacheKey);
    if (cached){
      console.log("Returning cached weather for:", cacheKey);
      return { source: "cache", weather: cached };}

    let coords = { lat, lon };

    if (location) {
      const geo = await this.getCoordinates(location);
      if (!geo) throw new Error(`City "${location}" not found`);
      coords = geo;
    }

    const weather = await this.fetchCurrentWeather(coords.lat!, coords.lon!);

    await WeatherCache.set(cacheKey, weather);
    await this.saveWeatherToDB(location || cacheKey, weather);

    return { source: "api", weather };
  }
}