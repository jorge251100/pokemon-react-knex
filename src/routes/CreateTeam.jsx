import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateNewTeam } from '../services/crud_functions';
import NavBar from '../components/NavBar';

function CreateTeam() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 1 || name.length > 20) {
      alert('Name must be between 1 and 15 characters.');
      return;
    }

    try {
      const team = await CreateNewTeam(id, name);
      alert('New Team created successfully.');
      navigate(`/team/${id}/${team.id}`);
    } catch (error) {
      console.error('Failed to create a new Team:', error);
      alert('Failed to create a new Team.');
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <h2>Create a New Team</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Create Team</button>
        </form>
      </div>
    </>
  );
}

export default CreateTeam;
