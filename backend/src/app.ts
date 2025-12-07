import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from "./routes/user.routes";
import weatherRoutes from "./routes/weather.routes";
import { auth } from './middlewares/auth';


const app = express();

app.use(express.json());

app.use("/user", auth, userRoutes);
app.use("/weather", weatherRoutes);

app.use(errorHandler);

export default app;