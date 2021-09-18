/**
 * Main application
 */

// importing with ES6 modules
import Express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import registerSongEndpoints from './actions/songs/registerSongEndpoints.js';
import registerPlaylistEndpoints from './actions/playlist/registerPlaylistEndpoints.js';
import registerUserEndpoints from './actions/users/registerUserEndpoints.js';
import authenticateEndpoints from './actions/auth/index.js';
import authMiddleware from './middleware/auth.js';

// initialize dotenv
dotenv.config();

// create a new express aplication
const app = Express();

// define enviroment
const { NODE_ENV } = process.env;

// cors config options
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));

// Add json body parser
app.use(bodyParser.json());

// Register the endpoints
app.use('/tracks', authMiddleware, registerSongEndpoints);
app.use('/playlist', registerPlaylistEndpoints);
app.use('/user', registerUserEndpoints);
app.use('/auth', authenticateEndpoints);

if (NODE_ENV !== 'test') {
  // open the app
  app.listen(process.env.PORT, () => {
    console.log(`CORS-enabled web server is listening to port ${process.env.PORT}`);
  });
}

export { app };
