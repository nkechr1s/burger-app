import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Header } from "./components";
import { Toaster } from "react-hot-toast";

const Shell = () => {
  return (
    <>
      <Header />
      <main className="container">
        <RouterProvider router={router} />
      </main>
      <Toaster />
    </>
  );
};

export default Shell;
