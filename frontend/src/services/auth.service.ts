import axios from "axios";

export type AuthResponse = {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
};

export async function login(username: string, password: string): Promise<AuthResponse> {
  console.log("Logging in with", { username, password });
  const res = await axios.post<AuthResponse>("http://localhost:3000/user/login", {
    username,
    password,
  });
  return res.data;
}

export async function signup(username: string, email: string, password: string): Promise<AuthResponse> {
  console.log("Signing up with", { username, email });
  const res = await axios.post<AuthResponse>("http://localhost:3000/user/register", {
    username,
    email,
    password,
  });
  return res.data;
}
