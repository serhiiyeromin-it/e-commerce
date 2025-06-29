
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setIsAdmin(res.data.role === "admin");
      })
      .catch(() => {
        setIsAdmin(false);
      });
  }, []);

  if (isAdmin === null) return <p>Laden...</p>;

  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
