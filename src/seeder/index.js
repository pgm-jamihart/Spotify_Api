/**
 * Imports 
 */
import faker from 'faker';
import _ from 'underscore';


// models (crud communication with database)
import Users from '../lib/UsersDB.js';
import Playlists from '../lib/PlaylistsDB.js';
import Songs from '../lib/SongsDB.js';

// Global constants
const usersDB = new Users();
const playlistsDB = new Playlists();
const songsDB = new Songs();

const createUsers = (amount) => {
  const usersPlain = [];
  const users = [];
  let amountUsername = 0;
  // Loop until amount is smaller than amountUsername 
  while(amountUsername < amount) {

    // create new user 
    const user = {
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      admin: faker.datatype.boolean(),
      password: faker.internet.password(),
      playlists: faker.random.arrayElements(),
      song_id: faker.random.arrayElements([1,2,3,4,5,6,7,8,9])
    };
    
    // check if username is unique 
    if (usersPlain.indexOf(user.username) < 0) {
      usersPlain.push(user.name);
      users.push(user);
      amountUsername++;   
    }
  }
  // Return declared amount of users
  return users;
};

const seedUsers = (users) => {
  try {
    const ids = users.map(async (user) => {
      const [ id ] = await usersDB.addSeed(user);
      return id;
    })
    
    return Promise.all(ids);
  } catch (e) {
    return console.error(e.message)
  }  
};

const createPlaylists = (amount, userids) => {
  const playlists = [];
  for (let i = 0; i < amount; i++) {
    const playlist = {
      title: faker.lorem.word(),
      user_id: _.sample(userids),
      createdAt: faker.date.past(),
      modifiedAt: faker.date.recent(),
      songs: faker.random.arrayElements(),
    }
    console.log(`Created a new fake playlist: ${playlist.title}`);
    playlists.push(playlist);
  }
  return playlists;
};

const seedPlaylists = (playlists) => {
  try {
    const ids = playlists.map(async (playlist) => {
      const id = await playlistsDB.addSeed(playlist);
      return id;
    })
    
    return Promise.all(ids);
  } catch (e) {
    return console.error(e.message)
  }  
};

const createSongs = (amount, playlistids) => {
  const songs = [];
  for (let i = 0; i < amount; i++) {
    const song = {
      title: faker.lorem.word(),
      playlist_id: _.sample(playlistids),
      artist: faker.name.firstName() + ' ' + faker.name.lastName(),
      date_added: faker.date.past(),
      URI: "spotify:track:" + faker.datatype.uuid(),
    }
    console.log(`Created a new fake song: ${song.title}`);
    songs.push(song);
  }
  return songs;
};

const seedSongs = (songs) => {
  try {
    const ids = songs.map(async (song) => {
      const id = await songsDB.addSeed(song);
      return id;
    })
    
    return Promise.all(ids);
  } catch (e) {
    return console.error(e.message)
  }  
};

const seed = async () => {
  /**
   * Create and seed users 
   */ 
  const users = createUsers(50);
  console.log(`Created ${users.length} users`);
  const userids = await seedUsers(users);
  console.log(userids);
  console.log('Users added to database');

  /**
   * Get users from database
   */
  // const users = await usersDB.get();
  // const userids = users.map(user => user.id);

  /**
  * Create and seed playlists 
  */ 
  const playlists = createPlaylists(50, userids);
  const playlistids = await seedPlaylists(playlists);
  console.log(`${playlistids.length} Playlists added to database`);
  
  /**
   * Get playlists from database 
   */
  // const playlists = await playlistsDB.get();
  // const playlistids = playlists.map(playlist => playlist.id);
  // console.log(playlistids)

  /**
  * Create and seed songs
  */ 
  const songs = createSongs(100, playlistids);
  const songsids = await seedSongs(songs);
  console.log(`${songsids.length} Playlists added to database`);

  /**
   * Get songs from database
   */
  //  const songs = await songsDB.get();
  //  const songTitles = songs.map(song => song.title);
  //  console.log(songTitles);
  
  process.exit();
}

seed();
