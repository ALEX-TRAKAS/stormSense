import { pool } from "../db/db";
import bcrypt from "bcrypt";

export const AuthService = {
  async register(username: string, email: string, password: string, location?: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash, location) VALUES ($1,$2,$3,$4) RETURNING id",
      [username, email, passwordHash, location]
    );

    return result.rows[0];
  },

  async findByUsername(username: string) {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return result.rows[0];
  },

  async validatePassword(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
};
