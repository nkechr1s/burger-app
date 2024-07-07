import { useContext, createContext, useState } from "react";
import { AuthContextType, AuthProviderProps } from "../../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState(localStorage.getItem("site-token") || "");
  const navigate = useNavigate();

  const loginAction = async (data: { name: string; password: string }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.token) {
        setToken(res.token);
        localStorage.setItem("site-token", res.token);
        toast.success("You are now logged in!", {
          duration: 5000,
        });
        navigate("/");
        return;
      }
      throw new Error(res);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong");
        throw new Error("Failed to logged in");
      }
    }
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("site-token");
    navigate("/login");
  };

  const authContextValue: AuthContextType = {
    token,
    isAuthenticated: !!token,
    login: loginAction,
    logout: logOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
