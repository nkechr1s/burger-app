import { useQuery } from "react-query";
import { fetchIngredients } from "../../lib/api/ingredients";
import { useAuth } from "../../context";
import { Ingredient as IngredientProps } from "../../types";
import { Loader, Ingredient } from "../../components";
import toast from "react-hot-toast";
import "./BurgerBuilder.css";

const BurgerBuilder = () => {
  const auth = useAuth();
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
        // Check if the error has a status and if it is 401
        if (error.status === 401) {
          toast.error("Session expired")
          console.log("Unauthorized error occurred. Logging out...");
          auth.logout();
        }
      },
    }
  );
  if (isLoading) return <Loader />;
  if (error) {
    toast.error(error.message);
  }
  return (
    <div className="ingredients">
      <div>the burger</div>
      <ul className="ingredients_items">
        {Array.isArray(ingredients) &&
          ingredients.map((ingredient) => (
            <Ingredient key={ingredient.id} {...ingredient} />
          ))}
      </ul>
    </div>
  );
};

export default BurgerBuilder;
