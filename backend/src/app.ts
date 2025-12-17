import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from "./routes/auth.routes";
import weatherRoutes from "./routes/weather.routes";
// import { auth } from './middlewares/auth';
import cors from "cors";



const app = express();
app.use(cors({
     origin: true, 
    credentials: true 

}));
app.use(express.json());

app.use("/user", authRoutes);
app.use("/api/weather", weatherRoutes);

app.get('/api/test', (req, res) => {
  res.json({ success: true });
});
app.use(errorHandler);

export default app;