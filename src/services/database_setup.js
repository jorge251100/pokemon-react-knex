const options = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '',
    database : 'knex'
  }
};

import knex from 'knex';
const db = knex(options);

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
  'phychic',
  'ice',
  'bug',
  'ghost',
  'steel',
  'dragon',
  'dark',
  'fairy'
];

async function createTables() {
  try {
    await db.schema.dropTableIfExists('Team_Pokemon');
    await db.schema.dropTableIfExists('Pokemon');
    await db.schema.dropTableIfExists('Team');
    await db.schema.dropTableIfExists('Trainer');

    await db.schema.createTable('Trainer', (table) => {
      table.increments('id').primary().unsigned();
      table.string('name', 15).notNullable().unique();
      table.string('address', 25).defaultTo('Metaverse traveller');
    });

    await db.schema.createTable('Team', (table) => {
      table.increments('id').primary().unsigned();
      table.integer('trainer_id').unsigned();
      table.foreign('trainer_id').references('id').inTable('Trainer');
      table.string('name', 20).notNullable().defaultTo('My Team');
    });

    await db.schema.createTable('Pokemon', (table) => {
      table.increments('id').primary();
      table.string('name', 15).notNullable();
      table.string('type', 10).notNullable().checkIn(pokemon_types);
      table.string('info', 100).nullable();
    });

    await db.schema.createTable('Team_Pokemon', (table) => {
      table.integer('team_id').unsigned();
      table.foreign('team_id').references('id').inTable('Team');
      table.integer('pokemon_id').unsigned();
      table.foreign('pokemon_id').references('id').inTable('Pokemon');
      table.primary(['team_id', 'pokemon_id']);
    });

    console.log('Tables created successfully.');

    const name = "Pikachu", type = "electric", info = "Your trustworthy companion";
    await db('Pokemon')
    .insert({ name, type, info})

    console.log('Initial pokemon created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables();