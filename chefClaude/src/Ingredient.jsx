export default function Ingredient({ ingredients, getRecipe, isLoading }) {
  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredients.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="get-recipe-container">
        <div>
          <h3>Ready for a recipe?</h3>
          <p>Generate a recipe from your list of ingredients.</p>
        </div>
        <button type="button" onClick={getRecipe} disabled={isLoading}>
          {isLoading ? "Cooking..." : "Get a recipe"}
        </button>
      </div>
    </section>
  );
}
