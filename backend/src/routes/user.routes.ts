import { Router } from "express";
import { getProfile, updateLocation, updateUsername } from "../controllers/user.controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/profile", auth, getProfile);
router.get("/profile", auth, updateLocation);
router.get("/profile", auth, updateUsername);

export default router;