import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    setFormData({ email: "", password: "" });

    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/login", formData);
      setMessage({ text: "Login successful!", type: "success" });
      console.log("User token:", res.data.token);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Login failed",
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
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message.text && (
        <p className={message.type === "success" ? "success" : "error"}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default LoginForm;
