import { useState } from "react";
export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const ingredientListItems = ingredients.map((item) => {
    return <li key={item} className="list-items">{item}</li>;
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
      <ul>{ingredientListItems}</ul>
    </main>
  );
}
