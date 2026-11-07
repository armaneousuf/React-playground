import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import Ingredient from "./Ingredient";
export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipeShown, setRecipeShown] = useState(false);
  

  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
  }

  function toggleRecipeShown() {
    setRecipeShown((prevRecipe) => !prevRecipe);
  }

  return (
    <main>
      <form className="ingredient-form" action={handleSubmit}>
        <input
          aria-label="Add Ingredient"
          type="text"
          placeholder="e.g oregano"
          name="ingredient"
        />
        <button className="add-btn">+ Add Ingredient</button>
      </form>
      {ingredients.length > 0 ? (
        < Ingredient ingredients={ingredients} toggleRecipeShown={toggleRecipeShown}/>
      ) : null}

      {recipeShown ? (
        < ClaudeRecipe />
      ) : null}
    </main>
  );
}
