import { render, screen, waitFor,fireEvent } from "@testing-library/react";
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
