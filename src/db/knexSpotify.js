import knex from 'knex';

// Database configuration
const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: './src/db/spotify.db3'
  },
  useNullAsDefault: true
};

// Initialize and export knex library
const knexSpotify = knex(dbConfig);
export default knexSpotify;