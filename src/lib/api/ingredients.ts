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
      throw new Error("Failed to fetch ingredients");
    }
    const ingredients = await response.json();
    return ingredients;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw new Error("Failed to fetch ingredients");
  }
};
