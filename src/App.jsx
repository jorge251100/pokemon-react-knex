import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Menu from './routes/Menu';
import Trainer from './routes/Trainer';
import Team from './routes/Team';
import TeamPokemon from './routes/TeamPokemon';
import Pokemon from './routes/Pokemon';
import CreatePokemon from './routes/CreatePokemon';
import CreateTrainer from './routes/CreateTrainer';
import CreateTeam from './routes/CreateTeam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/team" element={<Trainer />} />
        <Route path="/team/:trainerId" element={<Team />} />
        <Route path="/team/:trainerId/:teamId" element={<TeamPokemon />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<CreatePokemon />} />
        <Route path="/trainer" element={<CreateTrainer />} />
        <Route path="/trainer/:id" element={<CreateTeam />} />
      </Routes>
    </Router>
  );
}

export default App
