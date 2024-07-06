import { useQuery } from "react-query";
import { fetchIngredients } from "../../lib/api/ingredients";
import { useAuth } from "../../context";
import { Ingredient } from "../../types";

const BurgerBuilder = () => {
  const auth = useAuth();

  const {
    data: ingredients,
    isLoading,
    error,
  } = useQuery<Ingredient[], Error>(
    ["ingredients", auth.token],
    () => fetchIngredients(auth.token),
    {
      enabled: !!auth.token,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul>
        {ingredients &&
          ingredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default BurgerBuilder;
