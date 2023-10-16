import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetAll from '../components/GetAll';
import NavBar from '../components/NavBar';
import { getPokemons } from '../services/crud_functions';

function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonId, setId] = useState('0');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPokemons();
        setPokemons(data);
      } catch (error) {
        console.error('Failed to fetch pokemons:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div>
        <h2>Edit pokemon</h2>
        <GetAll entity="Pokemon" list={pokemons} setter={setId} />
        <Link to={`/pokemon/${pokemonId}`}>Select Pokemon</Link>
      </div>
    </>
  );
}

export default Pokemon;
