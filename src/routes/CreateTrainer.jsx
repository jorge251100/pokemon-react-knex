import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateNewTrainer } from '../services/crud_functions';
import NavBar from '../components/NavBar';

function CreateTrainer() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('Metaverse traveller');
  const navigate = useNavigate();

  const sendForm = async (e) => {
    e.preventDefault();

    if (name.length < 1 || name.length > 15) {
      alert('Name must be between 1 and 15 characters.');
      return;
    }

    try {
      await CreateNewTrainer(name, address);
      alert('New Trainer created successfully.');
      navigate(-1);
    } catch (error) {
      console.error('Failed to create a new Trainer:', error);
      alert('Failed to create a new Trainer.');
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <h2>Create a New Trainer</h2>
        <form onSubmit={sendForm}>
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
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              maxLength="25"
            />
          </label>
          <br />

          <button type="submit">Create Trainer</button>
        </form>
      </div>
    </>
  );
}

export default CreateTrainer;
