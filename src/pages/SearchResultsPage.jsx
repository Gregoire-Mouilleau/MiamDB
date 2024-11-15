import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 

const SearchResultsPage = () => {
  const { query } = useParams(); 
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    };

    fetchRecipes();
  }, [query]);

  return (
    <div>
      <h2>Search results for: {query}</h2>
      <div className="row">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="col-md-4">
              <div className="card">
                <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.strMeal}</h5>
                  <Link to={`/recipe/${recipe.idMeal}`} className="btn btn-primary">
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
