import knex from 'knex';
import express from 'express';
import cors from 'cors';

const options = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'knex',
  },
};
const port = 3000;

const db = knex(options);

const app = express();
app.use(cors());

app.use(express.json());

// Returns all trainers' IDs and names from the database
app.get('/trainers', (req, res) => {
  db.select('id', 'name')
    .from('Trainer')
    .then((data) => {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.status(404).json({ error: 'No trainers were found.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Returns all Pokémon IDs and names
app.get('/pokemons', (req, res) => {
  db.select('id', 'name')
    .from('Pokemon')
    .then((data) => {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.json({ error: 'No pokemons were found.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Create a new trainer
app.post('/trainer', (req, res) => {
  console.log('trainer post flag');
  let { name, address } = req.body;
  address = address == "" ? "Metaverse traveller" : address;
  if (!name) {
    return res.status(400).json({ error: 'Name field is required.' });
  }

  db('Trainer')
  .insert({ name, address })
  .then((result) => {
    const lastInsertedId = result[0];
    return {
      id: lastInsertedId,
      name,
      address
    };
  })
  .then((data) => {
    res.status(201).json(data);
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  });
});

// Create a new Pokemon
app.post('/pokemon', (req, res) => {
  console.log('pokemon post flag');
  let { name, type, info } = req.body;
  info = info != "" ? info : null;
  if (!name || !type) {
    return res.status(400).json({ error: 'Name and type fields are required.' });
  }

  db('Pokemon')
    .insert({ name, type, info })
    .then((result) => {
      const lastInsertedId = result[0];
      return {
        id: lastInsertedId,
        name,
        type,
        info
      };
    })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.message.includes('pokemon_chk_1')) {
        res.status(400).json({ error: 'Invalid Pokemon type' });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
});

// Create a new Team
app.post('/team', (req, res) => {
  const { trainer_id, name } = req.body;
  if (!trainer_id || !name) {
    return res.status(400).json({ error: 'trainer_id and name fields are required.' });
  }

  db('Team')
    .insert({ trainer_id, name })
    .then((result) => {
      const lastInsertedId = result[0];
      return {
        id: lastInsertedId,
        trainer_id,
        name
      };
    })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Create new team member
app.post('/team_pokemon', (req, res) => {
  const { team_id, pokemon_id } = req.body;
  if (!team_id || !pokemon_id) {
    return res.status(400).json({ error: 'team_id and pokemon_id fields are required.' });
  }

  db('Team_Pokemon')
    .insert({ team_id, pokemon_id })
    .then(() => {
      return db('Team_Pokemon').where('team_id', team_id);
    })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ error: 'This Pokémon is already in the team.' });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
});

// update pokemon
app.put('/pokemon/:id', (req, res) => {
  const { id } = req.params;
  let { name, type, info } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: 'Name and type fields are required.' });
  }

  const update = { name, type };
  update.info = info !== "" ? info : null;

  db('Pokemon')
    .where('id', id)
    .update(update)
    .then(() => {
      return db('Pokemon').where('id', id).first();
    })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: 'Pokemon not found.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// deletes the row with the same pokemon and team id
app.delete('/team_pokemon/:team_id/:pokemon_id' , (req, res) => {
  const { team_id, pokemon_id } = req.params;

  db('Team_Pokemon')
    .where({ team_id, pokemon_id })
    .del()
    .then((deletedRow) => {
      if (deletedRow) {
        return db('Team_Pokemon').where({ team_id });
      } else {
        res.status(404).json({ error: 'Team_Pokemon row not found.' });
      }
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// verify id middleware
app.use((req, res, next) => {
  if (!req.query.id) {
    return res.status(400).json({ error: 'id is required' });
  }
  next();
});

// returns all team id who belong to the same trainer_id
app.get('/team', (req, res) => {
  const { id } = req.query;

  db('Team')
    .where('trainer_id', id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// returns all rows that belong to the same team_id
app.get('/team_pokemon', (req, res) => {
  const { id } = req.query;

  db('Team_Pokemon')
    .where('team_id', id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
})

// returns trainer with specific id
app.get('/trainer', (req, res) => {
  const { id } = req.query;

  db('Trainer')
    .where('id', id)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
})

// returns pokemon with specific id
app.get('/pokemon', (req, res) => {
  const { id } = req.query;

  db('Pokemon')
    .where('id', id)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Server at url http://127.0.0.1:${port}/`);
});
