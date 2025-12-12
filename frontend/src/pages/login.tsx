import AuthForm from "../components/authForm";
import { login } from "../services/auth.service";

export default function LoginPage() {
  return (
    <AuthForm
      mode="login"
      onSubmit={async ({ email, password }) => {
        const res = await login(email, password);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
      }}
    />
  );
}
