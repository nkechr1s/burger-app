import React, { useState } from "react";
import "./LoginForm.css";
import { useAuth } from "../../context";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginForm = () => {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState({
    name: false,
    password: false,
  });

  const handleSubmitEvent = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (input.name !== "" && input.password !== "") {
      try {
        await auth.login(input);
      } catch (error) {
        setError({
          name: true,
          password: true,
        });
      }
    } else {
      setError({
        name: input.name === "",
        password: input.password === "",
      });
      toast.error("Please provide valid input");
    }
  };
  const handleInput = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <form onSubmit={handleSubmitEvent} className="login-form">
      {/* I would suggest to use a react library for forms like react-hook form*/}
      <h1 aria-label="Login to your account" className="form-title">
        🔐 Login to your account
      </h1>
      <div className="form_control">
        <label htmlFor="name">Email:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={input.name}
          onChange={handleInput}
          className={error.name ? "error" : ""}
        />
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={input.password}
            onChange={handleInput}
            className={error.password ? "error" : ""}
          />
          {showPassword ? (
            <FiEyeOff className="password-toggle-icon" onClick={togglePasswordVisibility} />
          ) : (
            <FiEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
          )}
        </div>
      </div>
      <button type="submit" className="primary-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
