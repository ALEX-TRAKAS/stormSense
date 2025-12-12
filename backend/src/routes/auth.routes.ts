import { Router} from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = Router();
router.use("/user")
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
