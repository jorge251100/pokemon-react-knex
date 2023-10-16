import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Menu.css';

function Menu() {
  return (
    <div className="menu-container">
      <h1>Main Menu</h1>
      <Link to="/team" className="menu-button">
        Manage Teams
      </Link>
      <Link to="/pokemon" className="menu-button">
        See Pokemons
      </Link>
    </div>
  );
}

export default Menu;
