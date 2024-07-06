import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Header } from "./components";

const Shell = () => {
  return (
    <>
      <Header />
      <main className="container">
        <RouterProvider router={router} />
      </main>
    </>
  );
};

export default Shell;
