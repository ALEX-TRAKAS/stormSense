import axios from "axios";


export type CurrentWeather = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
};

export type WeatherData = {
  latitude: number;
  longitude: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;
  current_weather: CurrentWeather;
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

  const res = await axios.get<WeatherResult>("http://localhost:3000/api/weather", { params: query });
  //remove all console logs below before final submission
  console.log("http://localhost:3000/weather", { params: query });
  console.log("Weather response:", res.data); 
  return res.data;
}



