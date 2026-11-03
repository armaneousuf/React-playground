export default function Main() {
  const ingredient = ["Chicked", "Oregano", "Tomatoes"];
  const ingredientListItems = ingredient.map((item) => {
    return <li key={item}>{item}</li>;
  });

  function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get('ingredient');
    ingredient.push(newIngredient)
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
