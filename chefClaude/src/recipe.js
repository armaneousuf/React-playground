const COOKING_DELAY_MS = 600;

const RECIPES = [
  {
    keywords: ["egg", "rice"],
    minimumMatches: 2,
    title: "Golden Egg Fried Rice",
    intro:
      "A fast, comforting way to turn leftover rice and eggs into a proper meal.",
    ingredients: [
      "2 cups cooked rice (day-old is best)",
      "3 eggs, beaten",
      "1 small onion, diced",
      "2 tbsp soy sauce",
      "1 tbsp cooking oil",
      "1 tsp sesame oil (optional)",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Heat the cooking oil in a wide pan over medium-high heat.",
      "Pour in the eggs and scramble until just set, then transfer them to a plate.",
      "Sauté the onion for 2-3 minutes, then add the rice and soy sauce.",
      "Fold the eggs back in, season with salt and pepper, and serve hot.",
    ],
    tip: "Cold, day-old rice fries better than fresh rice because it has less surface moisture.",
  },
  {
    keywords: ["pasta", "spaghetti", "noodle", "tomato"],
    minimumMatches: 2,
    title: "Weeknight Tomato Pasta",
    intro:
      "A simple pantry pasta with a rich tomato sauce that comes together in one pan.",
    ingredients: [
      "8 oz pasta",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 can (14 oz) crushed tomatoes, or 3 fresh tomatoes, chopped",
      "1 tsp dried oregano",
      "Salt, pepper, and chili flakes to taste",
      "Grated cheese, to serve (optional)",
    ],
    instructions: [
      "Cook the pasta in salted water until al dente. Reserve 1/2 cup of the pasta water.",
      "Warm the olive oil in a pan and sauté the garlic for 30 seconds.",
      "Add the tomatoes and oregano, then simmer for 10 minutes.",
      "Toss the pasta with the sauce, loosening it with pasta water. Season and serve.",
    ],
    tip: "The starchy pasta water helps the sauce cling to every strand.",
  },
  {
    keywords: ["chicken"],
    title: "Golden Skillet Chicken",
    intro:
      "A juicy, golden chicken dinner that needs only one pan and a handful of spices.",
    ingredients: [
      "2 chicken breasts or thighs",
      "1 tbsp olive oil",
      "1 tsp paprika",
      "1/2 tsp garlic powder",
      "Salt and pepper to taste",
      "1 lemon, cut into wedges (optional)",
    ],
    instructions: [
      "Pat the chicken dry and season both sides with paprika, garlic powder, salt, and pepper.",
      "Heat the oil in a skillet over medium-high heat.",
      "Cook the chicken for 5-6 minutes per side, until golden and cooked through.",
      "Rest for 5 minutes, squeeze over the lemon, and slice.",
    ],
    tip: "A hot pan and dry chicken are the secrets to a golden crust.",
  },
  {
    keywords: ["potato"],
    title: "Crispy Potato Hash",
    intro:
      "Crispy potatoes with soft onions and a smoky edge — breakfast or dinner, your call.",
    ingredients: [
      "3 medium potatoes, diced",
      "2 tbsp cooking oil",
      "1 onion, diced",
      "1 tsp smoked paprika",
      "Salt and pepper to taste",
      "2 eggs, fried (optional, for serving)",
    ],
    instructions: [
      "Heat the oil in a large pan over medium heat.",
      "Add the potatoes and cook for 12-15 minutes, stirring occasionally.",
      "Add the onion and paprika, then cook for 5 more minutes until crisp.",
      "Season, top with fried eggs if you like, and serve.",
    ],
    tip: "Don't crowd the pan — give the potatoes room to crisp.",
  },
];

function formatList(items) {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function createPantrySkillet(ingredients) {
  return {
    title: "Chef Claude's Pantry Skillet",
    intro:
      "A flexible one-pan recipe built around whatever you have on hand.",
    ingredients: [
      ...ingredients,
      "2 tbsp cooking oil",
      "Salt, pepper, and any spices you like",
    ],
    instructions: [
      "Prep the ingredients: wash, chop, and measure everything before you start cooking.",
      "Heat the oil in a large pan over medium-high heat.",
      "Cook the firmest ingredients first, then add the softer ones as they finish.",
      "Season well, cook until everything is tender and lightly browned, and serve.",
    ],
    tip: "Taste as you go and adjust the seasoning right before serving.",
  };
}

function pickRecipe(ingredients) {
  const haystack = ingredients.join(" ").toLowerCase();
  let bestRecipe = null;
  let bestScore = 0;

  for (const recipe of RECIPES) {
    const score = recipe.keywords.reduce(
      (total, keyword) => total + (haystack.includes(keyword) ? 1 : 0),
      0,
    );

    if (score < (recipe.minimumMatches ?? 1)) {
      continue;
    }

    if (score > bestScore) {
      bestRecipe = recipe;
      bestScore = score;
    }
  }

  return bestRecipe ?? createPantrySkillet(ingredients);
}

function buildRecipeMarkdown(recipe, userIngredients) {
  const ingredientLines = recipe.ingredients
    .map((ingredient) => `- ${ingredient}`)
    .join("\n");

  const instructionLines = recipe.instructions
    .map((step, index) => `${index + 1}. ${step}`)
    .join("\n");

  return `## ${recipe.title}

${recipe.intro}

**Your ingredients:** ${formatList(userIngredients)}

### Ingredients
${ingredientLines}

### Instructions
${instructionLines}

### Chef's tip
${recipe.tip}`;
}

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Recipe request aborted", "AbortError"));
      return;
    }

    let timer;
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Recipe request aborted", "AbortError"));
    };

    timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Pick a hardcoded recipe based on the supplied ingredients.
 * No API key or network request is required.
 *
 * @param {string[]} ingredientsArr
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<string>} Markdown recipe
 */
export async function getRecipeFromChefClaude(
  ingredientsArr,
  { signal } = {},
) {
  if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
    throw new Error("Add at least one ingredient before asking for a recipe.");
  }

  // Keep the loading state visible for a moment so the app feels responsive.
  await wait(COOKING_DELAY_MS, signal);

  return buildRecipeMarkdown(pickRecipe(ingredientsArr), ingredientsArr);
}
