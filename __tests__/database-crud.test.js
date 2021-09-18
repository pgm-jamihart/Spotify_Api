/**
 * Testing crud functions to the database
 */

import UsersDB from '../src/lib/UsersDB.js';
import SongsDB from '../src/lib/SongsDB.js';
import PlaylistsDB from '../src/lib/PlaylistsDB.js';

const usersDB = new UsersDB();
const songsDB = new SongsDB();
const playlistsDB = new PlaylistsDB();

describe('Tests to sqlite 3 database', () => {

  it('should return an array with at least one user', async () => {
    const users = await usersDB.get();

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return an array with at least one song', async () => {
    const songs = await songsDB.get();

    expect(Array.isArray(songs)).toBe(true);
    expect(songs.length).toBeGreaterThan(0);
  });

  it('should return an array with at least one playlist', async () => {
    const playlists = await playlistsDB.get();

    expect(Array.isArray(playlists)).toBe(true);
    expect(playlists.length).toBeGreaterThan(0);
  });


});