import { useQuery } from "react-query";
import { fetchIngredients } from "../../lib/api/ingredients";
import { useAuth } from "../../context";
import { Ingredient } from "../../types";
import { Loader } from "../../components";
import toast from "react-hot-toast";

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
      onError: (error: any) => {
        // Check if the error has a status and if it is 401
        if (error.status === 401) {
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
