/**
 * All the crud operation actions together
 */

import parseUser from './parseUser.js';

/**
 * Getting users
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const getUsers = async (user, request, response) => {
  try {
    response.status(200).json({ users: await user.get() });
  } catch ({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

/**
 * Creates a new user item
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const addUser = async (user, request, response) => {
  try {
    const {
      name, username, email, admin, password,
    } = parseUser(request, response);
    const newUser = await user.add(name, username, email, admin, password);
    response.status(201).json({ user: newUser });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a new user item
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const updateUser = async (user, request, response) => {
  try {
    const {
      name, username, email, password,
    } = parseUser(request, response);
    const { id } = request.params;
    const updatedUser = await user.update(id, name, username, email, password);
    response.status(200).json({ user: updatedUser });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Delete a user item
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const deleteUser = async (user, request, response) => {
  try {
    const { id } = request.params;
    await user.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
