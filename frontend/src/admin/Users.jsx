import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error("Ошибка при загрузке пользователей", err));
  }, []);

  const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Пользователь удалён");
    setUsers(users.filter(u => u._id !== id)); // обновляем список
  } catch (err) {
    console.error("Ошибка:", err.response?.data || err.message);
  }
  };



  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Все пользователи</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Адрес</th>
            <th>Löschen</th>   
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.address || "–"}</td>
              <td><button onClick={() => deleteUser(u._id)}>Удалить</button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
