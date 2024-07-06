import React, { useState } from "react";
import { useAuth } from "../../context";

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
      alert("Please provide valid input");
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
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="name">Email:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={input.name}
          onChange={handleInput}
          required
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
          required
        />
      </div>
      <button type="submit" className="primary-button">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
