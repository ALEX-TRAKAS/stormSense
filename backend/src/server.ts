import app from './app';
import config from './config/config';
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});


