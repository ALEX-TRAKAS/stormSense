import axios from "axios";
import { Request, Response } from "express";
import { WeatherCache } from "../services/weatherCache.service";
import { pool } from "../db/db";

export async function getWeather(req: Request, res: Response) {
  const location = req.query.location as string;

  const cached = await WeatherCache.get(location);
  if (cached) return res.json({ source: "cache", ...cached });

  const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      q: location,
      appid: process.env.WEATHER_API_KEY,
      units: "metric"
    }
  });

  const data = response.data;

 
  await WeatherCache.set(location, data);

  
  await pool.query(
    `INSERT INTO weather_history (location, temperature, humidity, wind, data)
     VALUES ($1,$2,$3,$4,$5)`,
    [
      location,
      data.main.temp,
      data.main.humidity,
      data.wind.speed,
      data
    ]
  );

  res.json({ source: "api", ...data });
}
