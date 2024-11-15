import React, { useEffect, useState } from 'react';

const RandomRecipePage = () => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);  
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);  
        }
      });
  }, []);  

  return (
    <div className="container">
      <h2>Random Recipe</h2>
      {recipe ? (
        <div>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="img-fluid" />
          <h3>{recipe.strMeal}</h3>
          <p><strong>Category:</strong> {recipe.strCategory}</p>
          <p><strong>Areaaaa:</strong> {recipe.strArea}</p>
          <h4>Instructions</h4>
          <p>{recipe.strInstructions}</p>

          <h4>Ingredients</h4>
          <ul>
            {Object.keys(recipe)
              .filter((key) => key.startsWith('strIngredient') && recipe[key])
              .map((ingredient, index) => (
                <li key={index}>
                  {recipe[ingredient]}: {recipe[`strMeasure${index + 1}`] || 'No measurement available'}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
};

export default RandomRecipePage;
