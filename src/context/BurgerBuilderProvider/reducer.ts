import { Action,ADD_INGREDIENT,REMOVE_INGREDIENT,CLEAR_INGREDIENTS } from "./actions";
import { State } from "../../types";

export const burgerReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case ADD_INGREDIENT:
        return {
          ...state,
          burgerIngredients: [
            ...state.burgerIngredients,
            { ...action.payload, index: state.burgerIngredients.length },
          ],
        };
      case REMOVE_INGREDIENT:
        return {
          ...state,
          burgerIngredients: state.burgerIngredients.filter(
            (ing) => ing.index !== action.payload
          ),
        };
      case CLEAR_INGREDIENTS:
        return {
          ...state,
          burgerIngredients: [],
        };
      default:
        return state;
    }
  };