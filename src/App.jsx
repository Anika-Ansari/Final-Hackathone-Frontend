import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/AuthForm";
import LoginForm from "./components/LoginForm";
import TaskDashboard from "./components/TaskDashboard";
import "./components/auth.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<TaskDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

// 🔹 Separate component for signup/login toggle
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      {isLogin ? <LoginForm /> : <SignupForm />}
      <p className="switch-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};
