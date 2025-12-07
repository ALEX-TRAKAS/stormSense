import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from "./routes/user.routes";
import weatherRoutes from "./routes/weather.routes";


const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/weather", weatherRoutes);

app.use(errorHandler);

export default app;