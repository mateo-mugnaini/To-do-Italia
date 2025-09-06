import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../../api/auth/login";

const Login = ({ handleChangeModal }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await LoginUser(form.email, form.password);

    if (!res.ok) {
      setError(res.error);
    } else {
      navigate("/"); // 🚀 redirige a la lista de tareas
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Login"}
        </button>
      </form>

      <p>
        Si no tienes cuenta haz click{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={handleChangeModal}
        >
          aquí
        </span>
      </p>
    </div>
  );
};

export default Login;
