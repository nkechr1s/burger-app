import { Ingredient as IngredientProps } from "../../types";
import "./Ingredient.css";
const Ingredient = ({ id, name, src, onClick }: IngredientProps) => {
  return (
    <li className="ingredient-item" title={name} onClick={onClick}>
      {src && (
        <div className="ingredient__item-container">
          <img
            className="ingredient__item-image"
            src={`${process.env.REACT_APP_API_URL}/img/${src}`}
            alt={`${name}-${id}`}
            title={name}
            loading="lazy"
          />
        </div>
      )}
      {name && <div className="ingredient__item-name">{name}</div>}
    </li>
  );
};

export default Ingredient;
