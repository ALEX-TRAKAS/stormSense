import axios from "axios";

export type AuthResponse = {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
};

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>("http://localhost:3000/user/login", {
    email,
    password,
  });
  return res.data;
}

export async function signup(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>("http://localhost:3000/user/register", {
    name,
    email,
    password,
  });
  return res.data;
}
