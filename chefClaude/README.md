# Chef Claude

A small React + Vite app that turns the ingredients in your kitchen into a recipe.

This is a self-contained demo: the recipes are **hardcoded** in
[`src/recipe.js`](src/recipe.js), so the app needs no API key, account, or
network request.

## Features

- Add ingredients with empty-input and duplicate validation.
- Get a recipe that matches the ingredients you entered.
- Falls back to a flexible "pantry skillet" recipe when nothing matches.
- Loading, error, and abort handling.
- Recipe rendered from Markdown with `react-markdown`.
- Responsive layout with accessible labels, live regions, and focus styles.

## Requirements

- Node.js 20.19+ (or 22.12+)

## Setup

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

There is no `.env` file and no key to configure.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## How it works

- [`src/Main.jsx`](src/Main.jsx) owns the ingredient list and recipe state,
  validates input, prevents duplicates, and handles loading/errors.
- [`src/recipe.js`](src/recipe.js) picks a hardcoded recipe by matching
  ingredient keywords, or builds the pantry-skillet fallback. It returns a
  Markdown string after a short simulated "cooking" delay.
- [`src/Ingredient.jsx`](src/Ingredient.jsx) shows the ingredient list and the
  **Get a recipe** button.
- [`src/ClaudeRecipe.jsx`](src/ClaudeRecipe.jsx) renders the Markdown recipe.

## Customizing the recipes

Edit the `RECIPES` array in [`src/recipe.js`](src/recipe.js). Each entry has:

```js
{
  keywords: ["egg", "rice"],
  minimumMatches: 2,
  title: "Golden Egg Fried Rice",
  intro: "A short description.",
  ingredients: ["2 cups cooked rice", "3 eggs"],
  instructions: ["Step one.", "Step two."],
  tip: "A useful cooking tip."
}
```

The recipe with the most keyword matches wins. `minimumMatches` defaults to
`1`; set it higher when a recipe needs several core ingredients (for example,
egg fried rice needs both eggs and rice). If nothing matches, the app uses
`createPantrySkillet()`. To plug in a real AI provider later, replace
`getRecipeFromChefClaude()` in the same file with your API call — the rest of the
app does not need to change.
