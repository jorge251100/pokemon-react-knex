import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateNewPokemon, SearchPokemon, UpdatePokemon } from '../services/crud_functions';
import NavBar from '../components/NavBar';

function CreatePokemon() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [type, setType] = useState('normal');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const SendForm = async (e) => {
    e.preventDefault();

    if (name.length < 1 || name.length > 15) {
      alert('Name must be between 1 and 15 characters.');
      return;
    }

    if (info.length > 100) {
      alert('Info must be no longer than 100 characters.');
      return;
    }

    try {
      if (id && id !== '0') {
        await UpdatePokemon(id, name, type, info);
        alert('Pokemon updated successfully.');
      } else {
        await CreateNewPokemon(name, type, info);
        alert('New Pokemon created successfully.');
      }

      navigate(-1);
    } catch (error) {
      console.error('Failed to create/update a Pokemon:', error);
      alert('Failed to create/update a Pokemon.');
    }
  };

  useEffect(() => {
    if (id && id !== '0') {
      async function fetchPokemon() {
        try {
          const pokemon = await SearchPokemon(id);
          if (pokemon) {
            setName(pokemon.name);
            setType(pokemon.type);
            setInfo(pokemon.info);
          }
        } catch (error) {
          console.error('Failed to fetch Pokemon data:', error);
        }
      }
      fetchPokemon();
    }
  }, [id]);

  return (
    <>
      <NavBar />
      <div>
        <h2>{id && id !== '0' ? 'Update' : 'Create'} Pokemon</h2>
        <form onSubmit={SendForm}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength="1"
              maxLength="15"
              required
            />
          </label>
          <br />

          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {pokemon_types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Info:
            <input
              type="text"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              maxLength="100"
            />
          </label>
          <br />

          <button type="submit">Create Pokemon</button>
        </form>
      </div>
    </>
  );
}

export default CreatePokemon;

const pokemon_types = [
  'normal',
  'fire',
  'water',
  'grass',
  'flying',
  'fighting',
  'poison',
  'electric',
  'ground',
  'rock',
  'psychic',
  'ice',
  'bug',
  'ghost',
  'steel',
  'dragon',
  'dark',
  'fairy',
];