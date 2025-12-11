import { Request, Response } from "express";
import { WeatherService } from "../services/weather.service";

export async function getWeather(req: Request, res: Response) {
  try {
    const location = req.query.location as string;
    const lat = req.query.lat ? Number(req.query.lat) : undefined;
    const lon = req.query.lon ? Number(req.query.lon) : undefined;

    if (!location && (lat === undefined || lon === undefined)) {
      return res.status(400).json({
        error: "Provide ?location=city or ?lat=x&lon=y"
      });
    }

    const result = await WeatherService.getWeather(lat, lon, location);

    res.json(result);

  } catch (error: any) {
    console.error("Weather error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch weather" });
  }
}
