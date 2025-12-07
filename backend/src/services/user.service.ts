import { pool } from "../db/db";

export const UserService = {

    async getProfileData(username: string) {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return result.rows[0];
  },

async updateLocation(userId: number, location: string) {
  const result = await pool.query(
    "UPDATE users SET location=$1 WHERE id=$2 RETURNING id, username, email, location",
    [location, userId]
  );
  return result.rows[0];
},


  async updateUsername(userId: number, username: string) { 
    const result = await  pool.query(
      "UPDATE users SET username=$1 WHERE id=$2",
      [username, userId]
    );
    return result.rows[0];
  },
 



};
