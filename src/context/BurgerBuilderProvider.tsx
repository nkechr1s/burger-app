import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Ingredient as IngredientProps } from "../types";

// Define action types
const ADD_INGREDIENT = "ADD_INGREDIENT";
const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
const CLEAR_INGREDIENTS = "CLEAR_INGREDIENTS";

// Define actions
type Action =
  | { type: typeof ADD_INGREDIENT; payload: IngredientProps }
  | { type: typeof REMOVE_INGREDIENT; payload: number }
  | { type: typeof CLEAR_INGREDIENTS };

// Define the initial state and reducer
interface State {
  burgerIngredients: IngredientProps[];
}

const initialState: State = {
  burgerIngredients: [],
};

const burgerReducer = (state: State, action: Action): State => {
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

const BurgerBuilderContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

 const BurgerBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(burgerReducer, initialState);

  return (
    <BurgerBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </BurgerBuilderContext.Provider>
  );
};
export default BurgerBuilderProvider;

export const useBurgerBuilder = () => useContext(BurgerBuilderContext);
