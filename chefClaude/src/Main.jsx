import { useState } from "react";
export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const ingredientListItems = ingredients.map((item) => {
    return <li key={item}>{item}</li>;
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
    e.currentTarget.reset();
  }
  return (
    <main>
      <form className="ingredient-form" onSubmit={handleSubmit}>
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
