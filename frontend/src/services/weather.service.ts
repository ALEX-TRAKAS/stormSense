import axios from "axios";

export type CurrentWeather = {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  is_day: number;
  weather_code: number;
  cloud_cover: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
};

export type WeatherData = {
  location?: string;
  latitude: number;
  longitude: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;

  current: CurrentWeather;
};

export type WeatherResult = {
  source: "api" | "cache";
  weather: WeatherData;
};

export async function getWeather(params: {
  city?: string;
  lat?: number;
  lon?: number;
}): Promise<WeatherResult> {
  const query: Record<string, string | number> = {};

  if (params.city) query.location = params.city;
  if (params.lat !== undefined) query.lat = params.lat;
  if (params.lon !== undefined) query.lon = params.lon;

  const res = await axios.get<WeatherResult>(
    "http://192.168.1.7:3000/api/weather", //change before production
    { params: query }
  );
  return res.data;
}