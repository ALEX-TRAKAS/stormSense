import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/profile", auth, getProfile);

export default router;