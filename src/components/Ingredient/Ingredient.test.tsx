/* eslint-disable jest/no-mocks-import */
import { render, screen,fireEvent } from "@testing-library/react";
import Ingredient from "./Ingredient";
import { mockData } from "../../__mocks__/mockIngredient";

test("renders the Ingredient component", () => {
  render(
    <Ingredient
      index={0}
      {...mockData}
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
  const ingredient = screen.getByTestId("ingredient");
  expect(ingredient).toBeInTheDocument();
});

test("calls onClick function when ingredient is clicked", () => {
  const handleClick = jest.fn(); 

  render(
    <Ingredient
      index={0}
      {...mockData}
      onClick={handleClick} 
    />
  );

  const ingredient = screen.getByTestId("ingredient");

  fireEvent.click(ingredient);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("renders ingredient without image container when src prop is not provided", () => {
  render(
    <Ingredient
      index={0}
      name={mockData.name}
      id={mockData.id}
      src=""
      onClick={() => {}} 
    />
  );

  const ingredientItemContainer = screen.queryByTestId("ingredient-item-container");

  expect(ingredientItemContainer).toBeNull(); 
});