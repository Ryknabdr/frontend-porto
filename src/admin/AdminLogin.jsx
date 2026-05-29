import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "hhttps://backend-porto-production-f413.up.railway.app/api/admin/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/raihan-admin");
    } catch (err) {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <p>Private Access</p>
        <h1>Admin Login</h1>

        {error && <div className="login-error">{error}</div>}

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Masuk Admin</button>
      </form>
    </div>
  );
}