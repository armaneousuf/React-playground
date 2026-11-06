import { useState } from "react";
export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const ingredientListItems = ingredients.map((item) => {
    return (
      <li key={item} className="list-items">
        {item}
      </li>
    );
  });

  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
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
      { ingredientListItems.length > 0 && <section>
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">
          {ingredientListItems}
        </ul>
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button>Get a recipe</button>
        </div>
      </section>}
    </main>
  );
}
