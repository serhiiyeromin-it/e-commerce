
import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) =>
        console.error("Ошибка при загрузке пользователей", err)
      );
  }, []);

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Пользователь удалён");
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Ошибка:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>👥 Все пользователи</h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "600px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f3f3f3" }}>
              <th style={thStyle}>Имя</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Роль</th>
              <th style={thStyle}>Адрес</th>
              <th style={thStyle}>Удаление</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{u.username}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>{u.role}</td>
                <td style={tdStyle}>{u.address || "–"}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => deleteUser(u._id)}
                    style={deleteButtonStyle}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Стили для заголовков и ячеек
const thStyle = {
  padding: "12px 15px",
  textAlign: "left",
  fontWeight: "bold",
  borderBottom: "2px solid #ccc",
};

const tdStyle = {
  padding: "12px 15px",
  fontSize: "14px",
  verticalAlign: "middle",
};

const deleteButtonStyle = {
  backgroundColor: "#e53e3e",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Users;
