import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchIngredients } from "../../lib/api/ingredients";
import { useAuth } from "../../context";
import { Ingredient as IngredientProps } from "../../types";
import { Loader, Ingredient } from "../../components";
import toast from "react-hot-toast";
import "./BurgerBuilder.css";

const BurgerBuilder = () => {
  const auth = useAuth();
  const [burgerIngredients, setBurgerIngredients] = useState<IngredientProps[]>(
    []
  );
  const {
    data: ingredients,
    isLoading,
    error,
  } = useQuery<IngredientProps[], Error>(
    ["ingredients", auth.token],
    () => fetchIngredients(auth.token),
    {
      enabled: !!auth.token,
      onError: (error: any) => {
        if (error.status === 401) {
          toast.error("Session expired");
          console.log("Unauthorized error occurred. Logging out...");
          auth.logout();
        } else {
          toast.error("Failed to fetch ingredients.");
        }
      },
    }
  );

  const addIngredientToBurger = (ingredient: IngredientProps) => {
    const updatedIngredients = [
      ...burgerIngredients,
      {
        ...ingredient,
        index: burgerIngredients?.length,
      },
    ];
    setBurgerIngredients(updatedIngredients);
  };

  const removeIngredientFromBurger = (index: number) => {
    const updatedIngredients = burgerIngredients.filter(
      (ing) => ing.index !== index
    );
    setBurgerIngredients(updatedIngredients);
  };
  if (isLoading) return <Loader />;
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="burger-builder">
      <h1>Build you burger</h1>
      <div className="ingredients">
        <div className="burger-preview">
          <div className="burger">
            <div className="burger__bun top">
              <img
                src={`${process.env.REACT_APP_API_URL}/img/bun_top.png`}
                alt="Top Bun"
                className="burger__bun-image"
              />
            </div>
            {burgerIngredients.map((ingredient) => (
              <div className="burger__ingredient" key={ingredient.index}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/img/${ingredient.src}`}
                  alt={ingredient.name}
                  className="burger__ingredient-image"
                  onClick={() => removeIngredientFromBurger(ingredient.index)}
                />
              </div>
            ))}
            <div className="burger__bun bottom">
              <img
                src={`${process.env.REACT_APP_API_URL}/img/bun_bottom.png`}
                alt="Bottom Bun"
                className="burger__bun-image"
              />
            </div>
          </div>
        </div>
        <h2>Ingredients</h2>
        <ul className="ingredients_items">
          {ingredients &&
            ingredients.map((ingredient) => (
              <Ingredient
                key={ingredient.id}
                {...ingredient}
                onClick={() => addIngredientToBurger(ingredient)}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default BurgerBuilder;
