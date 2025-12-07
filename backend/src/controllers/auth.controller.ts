import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthService } from "../services/auth.service";

export async function registerUser(req: Request, res: Response) {
  const { username, email, password, location } = req.body;

  try {
    const user = await AuthService.register(username, email, password, location);
    res.status(201).json({ message: "User registered", userId: user.id });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await AuthService.findByUsername(username);
  if (!user) return res.status(404).json({ error: "User not found" });

  const valid = await AuthService.validatePassword(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h"
  });

  res.json({ token });
}
