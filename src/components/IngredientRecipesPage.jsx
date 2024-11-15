import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const IngredientRecipesPage = () => {
  const { ingredientName } = useParams(); 
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipesByIngredient = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
        );
        const data = await response.json();

        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]); 
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipesByIngredient();
  }, [ingredientName]);

  return (
    <div>
      <h1>Recipes with "{ingredientName}"</h1>
      <div className="recipes-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-img"
              />
              <h2>{recipe.strMeal}</h2>
              <Link to={`/recipe/${recipe.idMeal}`}>
                <button>See Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No recipes found for this ingredient.</p>
        )}
      </div>
    </div>
  );
};

export default IngredientRecipesPage;
