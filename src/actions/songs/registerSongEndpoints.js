/**
 * Registering the song API endpoints
 */

// imports
import Express from 'express';
import SongsDB from '../../lib/SongsDB.js';
import {
  getSongs, addSong, updateSong, deleteSong,
} from './crudSong.js';

// init router
const app = Express.Router();

const songData = new SongsDB();
// console.log(songData)

// get the songs
app.get('/', async (req, res) => await getSongs(songData, req, res));

// add a song
app.post('/', async (req, res) => await addSong(songData, req, res));

// update a song
app.put('/:id', async (req, res) => await updateSong(songData, req, res));

// delete a song
app.delete('/:id', async (req, res) => await deleteSong(songData, req, res));

export default app;
