/**
 * Registering the user API endpoints
 */

// imports
import Express from 'express';
import UsersDB from '../../lib/UsersDB.js';
import {
  getUsers, addUser, updateUser, deleteUser,
} from './crudUser.js';

// init router
const app = Express.Router();

const userData = new UsersDB();
// console.log(userData)

// get the users
app.get('/', async (req, res) => await getUsers(userData, req, res));

// add a user
app.post('/', async (req, res) => await addUser(userData, req, res));

// update a user
app.put('/:id', async (req, res) => await updateUser(userData, req, res));

// delete a user
app.delete('/:id', async (req, res) => await deleteUser(userData, req, res));

export default app;
