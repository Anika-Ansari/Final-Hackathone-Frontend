import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import
import "./auth.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate(); // ✅ Initialize

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // const res = await axios.post("http://localhost:3000/api/v1/users/login" || "https://final-hackatnone-backend.onrender.com", formData, {
      //   headers: { "Content-Type": "application/json" },
      //   withCredentials: true,
      // });

      const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://final-hackatnone-backend.onrender.com"
    : "http://localhost:3000";

const res = await axios.post(
  `${API_URL}/api/v1/users/login`,
  formData,
  {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }
);


      setMessage({ text: "✅ Login successful!", type: "success" });

      // Save token if needed
      if (res.data.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
      }

      // ✅ Navigate to dashboard
      navigate("/gallery");

    } catch (error) {
      setMessage({
        text: `❌ ${error.response?.data?.message || error.message}`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
      {message.text && <p className={message.type === "error" ? "error" : "success"}>{message.text}</p>}
    </div>
  );
};

export default LoginForm;
