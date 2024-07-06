import { Ingredient as IngredientProps } from "../../types";
import "./Ingredient.css";
const Ingredient = ({ id, name, src, onClick }: IngredientProps) => {
  return (
    <li className="ingredient_item" title={name} onClick={onClick}>
      {src && (
        <div className="ingredient_item__container">
          <img
            className="ingredient_item__image"
            src={`${process.env.REACT_APP_API_URL}/img/${src}`}
            alt={`${name}-${id}`}
            title={name}
            loading="lazy"
          />
        </div>
      )}
      {name && <div className="ingredient_item__name">{name}</div>}
    </li>
  );
};

export default Ingredient;
