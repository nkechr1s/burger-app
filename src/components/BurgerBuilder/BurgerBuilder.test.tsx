import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query"; 
import BurgerBuilder from "./BurgerBuilder";
import { AuthProvider } from "../../context";

const queryClient = new QueryClient();

const BurgerBuilderWithProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AuthProvider>
          <BurgerBuilder />
        </AuthProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

test("renders the Burger Builder component", async () => {
  render(<BurgerBuilderWithProvider />);
  const burgerBuilder = screen.getByTestId("burger-builder");
  expect(burgerBuilder).toBeInTheDocument();
});
