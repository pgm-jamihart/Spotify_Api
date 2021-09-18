/**
 * CRUD users database
 */

// import
import knexSpotify from '../db/knexSpotify.js';


// export class
export default class Users {
  constructor() {
    this.table = 'users';
  }

  async get() {
    try {
      return await knexSpotify(this.table).select('*');
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Inserts a new field to users table
   *
   * @param {*} name
   * @param {*} username
   * @param {*} email
   * @param {*} admin
   * @param {*} password
   */
  async add(name, username, email, admin, password, playlists, song_id) {
    try {
      // add field, get new id
      console.log(username);
      const id = await knexSpotify(this.table).insert({
        name,
        username,
        email,
        admin,
        password,
        playlists,
        song_id,
      });
      return id;
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   * Deletes a specific user
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
   * Updates an existing user item
   *
   * @param {*} id
   * @param {*} name
   * @param {*} username
   * @param {*} email
   * @returns
   */
  async update(id, name, username, email) {
    try {
      return await knexSpotify(this.table).where('id', id).update({ name, username, email });
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   * Find one user based on username
   *
   * @param {*} username
   * @returns
   */
  async findOne(username) {
    try {
      return await knexSpotify(this.table).where({ username }).select('*').first();
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
      const id = await knexSpotify(this.table).insert(field);
      return id;
    } catch (e) {
      console.error(e.message);
    }
  }
}
