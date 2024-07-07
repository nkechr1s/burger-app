import { render, screen,fireEvent } from "@testing-library/react";
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

test("typing into email input updates state", () => {
    render(<LoginFormWithProvider />);
  
    const emailInput = screen.getByLabelText("Email:");
  
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  
    expect(emailInput).toHaveValue("test@example.com");
  });


  test("typing into password input updates state", () => {
    render(<LoginFormWithProvider />);
  
    const passwordInput = screen.getByLabelText("Password:");
  
    fireEvent.change(passwordInput, { target: { value: "test123" } });
  
    expect(passwordInput).toHaveValue("test123");
  });