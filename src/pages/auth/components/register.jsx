import { useState } from "react";
import { RegisterUser } from "../../../api/auth/register";

const Register = ({ handleChangeModal }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    const res = await RegisterUser(form.email, form.password);

    if (!res.ok) {
      setError(res.error);
      alert("Ocurrio un error, al registrarte⚠️");
    } else {
      alert("Usuario registrado correctamente ✅");
      handleChangeModal();
      console.log("Usuario creado ✅", res.data);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Registro</h1>

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
          {loading ? "Creando..." : "Registrarse"}
        </button>
      </form>

      <p>
        Si ya tienes cuenta haz click{" "}
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

export default Register;
