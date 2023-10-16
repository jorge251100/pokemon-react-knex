import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetAll from '../components/GetAll';
import { getTrainers } from '../services/crud_functions';
import NavBar from '../components/NavBar';

function Trainer() {
  const [trainers, setTrainers] = useState([]);
  const [trainerId, setId] = useState('0');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTrainers();
        setTrainers(data);
      } catch (error) {
        console.error('Failed to fetch trainers:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div>
        <h2>Trainer Selection</h2>
        <GetAll entity="Trainer" list={trainers} setter={setId} />
        <Link to={`/team/${trainerId}`}>Select</Link>
      </div>
    </>
  );
}

export default Trainer;
