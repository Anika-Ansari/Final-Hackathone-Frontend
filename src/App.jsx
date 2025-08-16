import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./components/AuthForm";
import LoginForm from "./components/LoginForm";
import Gallery from "./components/Gallery.jsx";
import ReviewCard from "./components/ReviewCard.jsx"; // make sure name matches
import Navbar from "./components/Navbar";



function App() {
  return (
    <>
      <Navbar/> {/* optional navbar */}
      <Routes>
        {/* Auth Page */}
        <Route path="/" element={<AuthPage />} />

        {/* Protected Pages */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<ReviewCard />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

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
