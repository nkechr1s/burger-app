import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { State, } from "../../types";
import { Action } from "./actions";
import { burgerReducer } from "./reducer";
import { initialState } from "./initialState";

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
