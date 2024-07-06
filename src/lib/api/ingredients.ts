import FetchError from "../errors/FetchError";
export const fetchIngredients = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/ingredients`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new FetchError("Failed to fetch ingredients", response.status);
    }
    const ingredients = await response.json();
    return ingredients;
  } catch (error: any) {
    console.error("Error fetching ingredients:", error);
    if (error instanceof FetchError) {
      throw error;
    } else {
      throw new FetchError("Failed to fetch ingredients", 500); // Default to 500 if status is not set
    }
  }
};
