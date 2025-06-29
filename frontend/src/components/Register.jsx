
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", form);
      alert("Registrierung erfolgreich!");
      setForm({ username: "", email: "", password: "" }); //freie Felder
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
      alert("Fehler bei der Registrierung");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <input
        type="text"
        placeholder="Name"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Registrierung
      </button>
    </form>
  );
}


