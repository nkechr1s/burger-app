import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";
import { Header } from "./components";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context";
import PrivateRoute from "./routes";
import { QueryClientProvider } from "react-query";
import queryClient from "./lib/services/queryClient"; // Import the queryClient instance
const Shell = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Header />
          <main className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </main>
          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default Shell;
