import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  
import { Link } from 'react-router-dom';

const CategoryRecipesPage = () => {
  const { categoryName } = useParams();  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const data = await response.json();
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setError('Aucune recette trouvée pour cette catégorie.');
        }
        setLoading(false);
      } catch (error) {
        setError('Erreur lors de la récupération des recettes.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [categoryName]);  

  return (
    <div>
      <h1>Recettes de {categoryName}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img className="recipe-img" src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h2>{recipe.strMeal}</h2>
              <p>{recipe.strCategory}</p>
              <Link to={`/recipe/${recipe.idMeal}`}>
                <button>See Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryRecipesPage;
