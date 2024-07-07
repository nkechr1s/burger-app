import { render, screen, waitFor } from "@testing-library/react";
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

test("it should count the array of ingredients", async () => {
  render(<BurgerBuilderWithProvider />);
  
  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() => screen.getByText("Ingredients"));

  const burgerIngredients = screen.queryAllByAltText(/.*/); 
  expect(burgerIngredients.length).toBe(2);
});

test("renders the top and bottom buns", async () => {
  render(<BurgerBuilderWithProvider />);
  

  const topBun = screen.getByRole('img', {
    name: /top bun/i
  })

  const bottomBun = screen.getByRole('img', {
    name: /bottom bun/i
  })

  expect(topBun).toBeInTheDocument();
  expect(bottomBun).toBeInTheDocument();
});