/**
 * Registering the playlist API endpoints
 */

// imports
import Express from 'express';
import PlaylistsDB from '../../lib/PlaylistsDB.js';
import { getPlaylists, addPlaylist, updatePlaylist, deletePlaylist } from './crudPlaylist.js';

// init router
const app = Express.Router();

const playlistData = new PlaylistsDB();
//console.log(playlistData)

// get the playlists
app.get('/', async (req, res) => await getPlaylists(playlistData, req, res));

// add a playlist
app.post('/', async (req, res) => await addPlaylist(playlistData, req, res));

// update a playlist
app.put('/:id', async (req, res) => await updatePlaylist(playlistData, req, res));

// delete a playlist
app.delete('/:id', async (req, res) => await deletePlaylist(playlistData, req, res));

export default app;