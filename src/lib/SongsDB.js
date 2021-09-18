/**
 * CRUD songs database
 */

// import
import knexSpotify from '../db/knexSpotify.js';

// export class
export default class Songs {
  constructor() {
    this.table = 'songs';
  }

  async get() {
    try {
      return await knexSpotify(this.table).select('*');
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Inserts a new field to songs table
   *
   * @param {*} title
   * @param {*} artist
   * @param {*} URI
   * @param {*} date_added
   */
  async add(title, artist, URI, date_added, playlist_id) {
    try {
      // add fields, get new id
      return await knexSpotify(this.table).insert({
        title,
        artist,
        URI,
        date_added,
        playlist_id,
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   * Deletes a specific song
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
   * Updates an existing song item
   *
   * @param {*} id
   * @param {*} title
   * @param {*} artist
   * @returns
   */
  async update(id, title, artist, URI) {
    try {
      return await knexSpotify(this.table).where('id', id).update({ title, artist, URI });
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
    try {
      // add fields, get new id
      const id = await knexSpotify(this.table).insert(field);
      return id;
    } catch (e) {
      console.error(e.message);
    }
  }
}
