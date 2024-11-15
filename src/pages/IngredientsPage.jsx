import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 

const IngredientRecipesPage = () => {
  const { ingredientName } = useParams(); 
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals || []); 
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [ingredientName]); 

  return (
    <div>
      <h1>Recipes with {ingredientName}</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-img"
              />
              <h3>{recipe.strMeal}</h3>
              <Link to={`/recipe/${recipe.idMeal}`} className="button">
                See Recipe Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found for this ingredient.</p>
      )}
    </div>
  );
};

export default IngredientRecipesPage;
