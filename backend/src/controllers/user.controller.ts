import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export async function getProfile(req: Request, res: Response) {
  const userId = (req as any).user.userId;

  const result = await UserService.getProfileData(userId);

  res.json(result.rows[0]);
}

export async function updateLocation(req: Request, res: Response) {
  const userId = (req as any).user.userId;
  const { location } = req.body;       
  try {
    const updatedUser = await UserService.updateLocation(userId, location);
    res.json({ message: "Location updated", user: updatedUser });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  } 
}

export async function updateUsername(req: Request, res: Response) {
  const userId = (req as any).user.userId;
  const { username } = req.body;    
  try {
    const updatedUser = await UserService.updateUsername(userId, username);
    res.json({ message: "Username updated", user: updatedUser });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }   
}
