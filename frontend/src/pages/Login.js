import { useState } from "react";
import API from "../api";
import LoginScreen from "../components/ui/LoginScreen";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", null, {
        params: { email, password }
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <LoginScreen
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
    />
  );
}

export default Login;