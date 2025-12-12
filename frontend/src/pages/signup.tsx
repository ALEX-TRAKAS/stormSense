import AuthForm from "../components/authForm";
import { signup } from "../services/auth.service";

export default function SignupPage() {
  return (
    <AuthForm
      mode="signup"
      onSubmit={async ({ name, email, password }) => {
        const res = await signup(name!, email, password);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
      }}
    />
  );
}
