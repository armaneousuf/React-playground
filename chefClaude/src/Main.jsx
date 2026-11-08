import { useRef, useState } from "react";
import { getRecipeFromChefClaude } from "./recipe";
import ClaudeRecipe from "./ClaudeRecipe";
import Ingredient from "./Ingredient";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [inputError, setInputError] = useState("");
  const recipeRequest = useRef(null);

  function cancelPendingRecipe() {
    if (recipeRequest.current) {
      recipeRequest.current.abort();
      recipeRequest.current = null;
    }

    setIsLoading(false);
  }

  function handleAddIngredient(event) {
    event.preventDefault();
    const newIngredient = ingredientInput.trim();

    if (!newIngredient) {
      setInputError("Type an ingredient first.");
      return;
    }

    const isDuplicate = ingredients.some(
      (item) => item.toLowerCase() === newIngredient.toLowerCase(),
    );

    if (isDuplicate) {
      setInputError(`${newIngredient} is already on your list.`);
      return;
    }

    // The ingredient list changed, so any recipe request in flight is stale.
    cancelPendingRecipe();
    setIngredients((prev) => [...prev, newIngredient]);
    setIngredientInput("");
    setInputError("");
    setRecipe("");
    setError("");
  }

  async function getRecipe() {
    if (isLoading || ingredients.length === 0) {
      return;
    }

    recipeRequest.current?.abort();
    const controller = new AbortController();
    recipeRequest.current = controller;

    setIsLoading(true);
    setError("");
    setRecipe("");
    setInputError("");

    try {
      const recipeMarkdown = await getRecipeFromChefClaude(ingredients, {
        signal: controller.signal,
      });

      if (!controller.signal.aborted) {
        setRecipe(recipeMarkdown);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating the recipe. Please try again.",
      );
    } finally {
      if (recipeRequest.current === controller) {
        recipeRequest.current = null;
        setIsLoading(false);
      }
    }
  }

  function handleIngredientChange(event) {
    setIngredientInput(event.target.value);

    if (inputError) {
      setInputError("");
    }
  }

  return (
    <main aria-busy={isLoading}>
      <form className="ingredient-form" onSubmit={handleAddIngredient} noValidate>
        <div className="ingredient-field">
          <input
            aria-label="Add Ingredient"
            aria-invalid={Boolean(inputError)}
            aria-describedby={inputError ? "ingredient-error" : undefined}
            type="text"
            placeholder="e.g. oregano"
            name="ingredient"
            autoComplete="off"
            value={ingredientInput}
            onChange={handleIngredientChange}
          />
          {inputError && (
            <p className="form-error" id="ingredient-error" role="alert">
              {inputError}
            </p>
          )}
        </div>
        <button className="add-btn" type="submit">
          + Add Ingredient
        </button>
      </form>

      {ingredients.length > 0 && (
        <Ingredient
          ingredients={ingredients}
          getRecipe={getRecipe}
          isLoading={isLoading}
        />
      )}

      {isLoading && (
        <p className="loading-message" role="status">
          <span className="spinner" aria-hidden="true" />
          Chef Claude is cooking up a recipe...
        </p>
      )}

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
