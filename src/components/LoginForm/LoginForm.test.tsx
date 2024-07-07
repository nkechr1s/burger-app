import { render, screen,fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import { AuthProvider, useAuth } from "../../context";
import { AuthContextType } from "../../types";

jest.mock("../../context", () => ({
    ...jest.requireActual("../../context"),
    useAuth: jest.fn(),
  }));
  
  const mockLogin = jest.fn(); // Mock function for auth.login

const LoginFormWithProvider = () => {
  return (
    <MemoryRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
    mockLogin.mockClear();

    // Mock useAuth to return mockLogin function
   (useAuth as jest.MockedFunction<typeof useAuth>).mockReturnValue({
       login: mockLogin,
       isAuthenticated: false, // Mock other necessary context values here
       logout: jest.fn(),
   } as unknown as AuthContextType);
});
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

test("submitting the form calls handleSubmitEvent function", () => {
  render(<LoginFormWithProvider />);

  const emailInput = screen.getByLabelText("Email:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Login");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "test123" } });

  fireEvent.click(submitButton);

  // Assert that login function is called
  expect(mockLogin).toHaveBeenCalledWith({
    name: "test@example.com",
    password: "test123",
  });
});