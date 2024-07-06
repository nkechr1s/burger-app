/* eslint-disable jest/no-mocks-import */
import { render, screen } from "@testing-library/react";
import Ingredient from "./Ingredient";
import { mockData } from "../../__mocks__/mockIngredient";

test("renders the component", () => {
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
