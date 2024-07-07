import { Ingredient as IngredientProps } from "../../types";
import "./Ingredient.css";
const Ingredient = ({ id, name, src, onClick }: IngredientProps) => {
  return (
    <li className="ingredient-item" title={name} onClick={onClick} data-testid="ingredient">
      {src && (
        <div className="ingredient-item-container">
          <img
            className="ingredient-item-image"
            src={`${process.env.REACT_APP_API_URL}/img/${src}`}
            alt={`${name}-${id}`}
            loading="lazy"
          />
        </div>
      )}
      {name && <div className="ingredient-item-name">{name}</div>}
    </li>
  );
};

export default Ingredient;
