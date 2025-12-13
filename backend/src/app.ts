import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from "./routes/auth.routes";
import weatherRoutes from "./routes/weather.routes";
// import { auth } from './middlewares/auth';
import cors from "cors";



const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/user", authRoutes);
app.use("/api/weather", weatherRoutes);

app.use(errorHandler);

export default app;