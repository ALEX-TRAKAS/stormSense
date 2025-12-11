import { Router } from "express";
import { getWeather } from "../controllers/weather.controller";

const router = Router();

router.get("/weather", getWeather);

export default router;