import React, { useState } from "react";
import SignupForm from "./components/AuthForm";
import LoginForm from "./components/LoginForm";
import "./components/auth.css";

function App() {
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
}

export default App;
