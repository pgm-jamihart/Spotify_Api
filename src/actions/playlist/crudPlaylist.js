/**
 * All the crud operation actions together
 */

import parsePlaylist from './parsePlaylist.js';


/**
 * Getting playlists
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const getPlaylists = async (playlist, request, response) => {
  try {
    response.status(200).json({ playlists: await playlist.get() });
  } catch ({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

/**
 * Creates a new playlist item
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const addPlaylist = async (playlist, request, response) => {
  const createdAt = new Date().toLocaleString();
  try {
    const { title, user_id } = parsePlaylist(request, response);
    const newPlaylist = await playlist.add(title, user_id, createdAt);
    response.status(201).json({ playlist: newPlaylist });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a new playlist item
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const updatePlaylist = async (playlist, request, response) => {
  const modifiedAt = new Date().toLocaleString();
  try {
    const { title, songs, user_id } = parsePlaylist(request, response);
    const { id } = request.params;
    const updatedPlaylist = await playlist.update(id, title, modifiedAt, songs, user_id);
    response.status(200).json({ playlist: updatedPlaylist });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Delete a playlist item
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const deletePlaylist = async (playlist, request, response) => {
  try {
    const { id } = request.params;
    await playlist.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
