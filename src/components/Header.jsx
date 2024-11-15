import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); 
    if (searchQuery) {
      navigate(`/recipes/search/${searchQuery}`);
    }
  };


  return (
    <header className="bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white h4 mb-0">
          MiamDB
        </Link>

        <form onSubmit={handleSearchSubmit} className="d-flex">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="btn btn-primary ml-2">Search</button>
        </form>
        <ul>
          <li><Link to="/random-recipe" className="btn btn-primary">Random Recipe</Link></li>
       </ul>
      </div>
    </header>
  );
};

export default Header;
