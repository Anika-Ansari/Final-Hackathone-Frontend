import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // const res = await axios.post(
      //   "http://localhost:3000/api/v1/users/register",
      //   formData,
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true, // in case cookies are set
      //   }
      // );

      const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://final-hackatnone-backend.onrender.com"
    : "http://localhost:3000";

const res = await axios.post(
  `${API_URL}/api/v1/users/register`,
  formData,
  {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }
);


      setMessage({
        text: "✅ Registration successful!",
        type: "success",
      });

      console.log("Server Response:", res.data);

      setFormData({ username: "", email: "", password: "" });
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
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "350px",
        margin: "auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Sign Up</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "95%",
          padding: "10px",
          background: loading ? "#ccc" : "#4CAF50",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Please wait..." : "Sign Up"}
      </button>

      {message.text && (
        <p
          style={{
            color: message.type === "error" ? "red" : "green",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {message.text}
        </p>
      )}
    </form>
  );
};

const inputStyle = {
  width: "90%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

export default RegisterForm;
