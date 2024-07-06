import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import { AuthProvider } from "../../context";

const HeaderWithProvider = () => {
  return (
    <MemoryRouter>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </MemoryRouter>
  );
};

test("renders the Header component", () => {
  render(<HeaderWithProvider />);
  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();
});
