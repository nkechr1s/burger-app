import { Ingredient as IngredientProps } from "../../types";

// Define action types
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const CLEAR_INGREDIENTS = "CLEAR_INGREDIENTS";

export type Action =
  | { type: typeof ADD_INGREDIENT; payload: IngredientProps }
  | { type: typeof REMOVE_INGREDIENT; payload: number }
  | { type: typeof CLEAR_INGREDIENTS };