import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GetAll from '../components/GetAll';
import NavBar from '../components/NavBar';
import { getTeams } from '../services/crud_functions';

function Team() {
  const { trainerId } = useParams();
  const [teams, setTeams] = useState([]);
  const [teamId, setId] = useState('0');
  const navigate = useNavigate();

  useEffect(() => {
    if (Number(trainerId) <= 0) {
      navigate("/trainer");
    }
    async function fetchData() {
      try {
        const data = await getTeams(trainerId);
        setTeams(data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    }
    fetchData();
  }, [trainerId, navigate]);

  return (
    <>
      <NavBar />
      <div>
        <h2>Team Selection</h2>
        <GetAll entity="Team" list={teams} setter={setId} />
        <Link to={`/team/${trainerId}/${teamId}`}>Select</Link>
      </div>
    </>
  );
}

export default Team;