export async function getTrainers() {
  try {
    const response = await fetch('http://127.0.0.1:3000/trainers');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTeams(trainerId) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/team?id=${trainerId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPokemons() {
  try {
    const response = await fetch('http://127.0.0.1:3000/pokemons');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTeamMembers(teamID) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/team_pokemon?id=${teamID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addPokemon(teamID, pokemonId) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/team_pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ team_id: teamID, pokemon_id: pokemonId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removePokemon(teamID, pokemonId) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/team_pokemon/${teamID}/${pokemonId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function CreateNewPokemon(name, type, info) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, type: type, info: info}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function SearchPokemon(pokemonId) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/pokemon?id=${pokemonId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function UpdatePokemon(id, name, type, info) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/pokemon/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, name: name, type: type, info: info }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function CreateNewTrainer(name, address) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/trainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, address: address}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function CreateNewTeam(trainerId, name) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trainer_id: trainerId, name: name}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}