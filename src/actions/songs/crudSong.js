/**
 * All the crud operation actions together
 */

import parseSong from './parseSong.js';


/**
 * Getting songs
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const getSongs = async (song, request, response) => {
  try {
    response.status(200).json({ songs: await song.get() });
  } catch ({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

/**
 * Creates a new song item
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const addSong = async (song, request, response) => {
  const date_added = new Date().toLocaleString();
  try {
    const { title, artist, URI } = parseSong(request, response);
    const newSong = await song.add(title, artist, URI, date_added);
    response.status(201).json({ song: newSong });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a new song item
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const updateSong = async (song, request, response) => {
  try {
    const { title, artist, URI } = parseSong(request, response);
    const { id } = request.params;
    const updatedSong = await song.update(id, title, artist, URI);
    response.status(200).json({ song: updatedSong });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Delete a song item
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const deleteSong = async (song, request, response) => {
  try {
    const { id } = request.params;
    await song.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
