// src/components/ProtectedRoute.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3333/user/check-auth", { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(res.data.authenticated);
        setLoading(false);
      })
      .catch((err) => {
        console.log("authentication failed!");
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
