import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import { AuthProvider } from "../../context";

const LoginFormWithProvider = () => {
  return (
    <MemoryRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </MemoryRouter>
  );
};

test("renders the Login Form component", () => {
  render(<LoginFormWithProvider />);
  const loginForm = screen.getByTestId("login-form");
  expect(loginForm).toBeInTheDocument();
});
