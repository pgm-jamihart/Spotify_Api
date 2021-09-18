/**
 * CRUD Playlist database
 */


// import
import knexSpotify from '../db/knexSpotify.js';

// export class
export default class Playlists {
  constructor() {
    this.table = 'playlists';
  }

  /**
   *
   * @returns all playlist items
   */
  async get() {
    try {
      return await knexSpotify(this.table).select('*');
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Inserts a new field to playlists table
   *
   * @param {*} title
   * @param {*} user_id
   * @param {*} createdAt
   */
  async add(title, user_id, createdAt, modifiedAt, songs) {
    try {
      // add fields get new id
      return await knexSpotify(this.table).insert({
        title,
        user_id,
        createdAt,
        modifiedAt,
        songs,
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   * Deletes a specific playlist
   *
   * @param {*} id
   * @returns
   */
  async delete(id) {
    try {
      return await knexSpotify(this.table).where('id', id).del();
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   *
   * Updates an existing playlist item
   *
   * @param {*} id
   * @param {*} title
   * @param {*} modifiedAt
   * @param {*} songs
   * @returns
   */
  async update(id, title, modifiedAt, songs, user_id) {
    try {
      return await knexSpotify(this.table).where('id', id).update({
        title, modifiedAt, songs, user_id,
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   *
   * @param {*} field
   * @returns
   */
  async addSeed(field) {
    // add fields get new id
    try {
      const id = await knexSpotify(this.table).insert(field);
      return id;
    } catch (e) {
      console.error(e.message);
    }
  }
}
