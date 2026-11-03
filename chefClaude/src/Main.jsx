export default function Main() {
  return (
    <main>
      <form className="ingredient-form">
        <input
          aria-label="Add Ingredient"
          type="text"
          placeholder="e.g oregano"
        />
        <button className="add-btn">+ Add Ingredient</button>
      </form>
    </main>
  );
}
