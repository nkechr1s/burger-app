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
        <input
          type="password"
          id="password"
          name="password"
          value={input.password}
          onChange={handleInput}
          className={error.password ? "error" : ""}
        />
      </div>
      <button type="submit" className="primary-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
