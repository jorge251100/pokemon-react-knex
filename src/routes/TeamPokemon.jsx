import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getTeamMembers, removePokemon, addPokemon, getPokemons } from '../services/crud_functions';
import GetAll from '../components/GetAll';
import NavBar from '../components/NavBar';

function TeamPokemon() {
  const { trainerId, teamId } = useParams();
  const [teamMembers, setMembers] = useState([]);
  const [pokemonId, setId] = useState('0');
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();

  const removeMember = async (pokemonId) => {
    await removePokemon(teamId, pokemonId);
    
    const updatedTeamMembers = await getTeamMembers(teamId);
    setMembers(updatedTeamMembers);
  };

  const addMember = async () => {
    if (pokemonId === '0') {
      navigate("/pokemon/0");
    } else {
      await addPokemon(teamId, pokemonId);
    
      const updatedTeamMembers = await getTeamMembers(teamId);
      setMembers(updatedTeamMembers);
      setId('0');
    }
  };  

  const updatePokemonList = async () => {
    console.log('inside updatePokemonList');
    const allPokemons = await getPokemons();
    const availablePokemons = allPokemons.filter((pokemon) => 
      !teamMembers.some((member) => member.pokemon_id === pokemon.id)
    );
    console.log("pokemons:", allPokemons);
    console.log("team members:", teamMembers);
    console.log("options:", availablePokemons);
    setPokemons(availablePokemons);
  };  

  useEffect(() => {
    if (Number(trainerId) <= 0) {
      navigate("/trainer");
    } 
    if (Number(teamId) <= 0) {
      navigate(`/trainer/${trainerId}`);
    }
    async function fetchData() {
      try {
        const data = await getTeamMembers(teamId);
        setMembers(data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    }
    fetchData();
  }, [trainerId, teamId, navigate]);

  useEffect(() => {
    updatePokemonList();
  }, [teamMembers]); 

  return (
    <>
      <NavBar />
      <div>
        <h2>Team Pokemon</h2>
        <table>
          <thead>
            <tr>
              <th>Pokemon</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.pokemon_id}>
                <td>{member.pokemon_id}</td>
                <td>
                  <button onClick={async () => await removeMember(member.pokemon_id)}>
                    Remove Pokemon
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {teamMembers.length < 6 && (
            <tfoot>
              <tr>
                <td>
                  <GetAll entity="Pokemon" list={pokemons} setter={setId} />
                </td>
                <td>
                  <button onClick={async () => await addMember()}>
                    Add Pokemon
                  </button>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );  
}

export default TeamPokemon;
