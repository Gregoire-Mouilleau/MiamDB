import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient !== "" && measure && measure !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <section>
        <h3>Instructions:</h3>
        <p>{recipe.strInstructions}</p>
      </section>

      <section>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>
              <strong>{item.ingredient}:</strong> {item.measure}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Category:</h3>
        <p>{recipe.strCategory}</p>

        <h3>Area:</h3>
        <p>{recipe.strArea}</p>
      </section>
    </div>
  );
};

export default RecipeDetail;
