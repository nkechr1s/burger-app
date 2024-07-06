import { useEffect, useState } from "react";
import { fetchIngredients } from "../../lib/api/ingredients";
import { useAuth } from "../../context";
import { Ingredient } from "../../types";

const YourComponent = () => {
  const auth = useAuth();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredientsData = async () => {
      try {
        const ingredientsData = await fetchIngredients(auth.token);
        setIngredients(ingredientsData);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    if (auth.token) {
      fetchIngredientsData();
    }
  }, [auth.token]);

//   console.log(ingredients);
  return (
    <div>
      <p>test</p>
    </div>
  );
};

export default YourComponent;
