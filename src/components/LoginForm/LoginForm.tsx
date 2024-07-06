import React, { useState } from "react";
import "./LoginForm.css";
import { useAuth } from "../../context";
import toast from "react-hot-toast";
const LoginForm = () => {
  const auth = useAuth();
  const [input, setInput] = useState({
    name: "",
    password: "",
  });

  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.name !== "" && input.password !== "") {
      auth.login(input);
    } else {
      toast.error("Please provide valid input");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitEvent} className="login-form">
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
        />
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={input.password}
          onChange={handleInput}
        />
      </div>
      <button type="submit" className="primary-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
