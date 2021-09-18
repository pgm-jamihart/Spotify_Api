/**
 * parse the incoming request
 */

export default (request) => {
  const { playlist } = request.body;
  console.log(playlist[0].user_id);

  // validate if we have a playlist in the body
  if (playlist == null) {
    throw new Error('The song object was not set!');
  }

  // check if we have a title
  if (playlist[0].title == null) {
    throw new Error('The playlist object does not contain a title!');
  }

  // check if we have an user_id
  if (playlist[0].user_id == null) {
    throw new Error('The playlist object does not contain an user_id.');
  }

  // trim all the white/none characters in our string
  if (playlist[0].title != null && playlist[0].user_id != null) {
    playlist.title = playlist[0].title.trim();
    playlist.user_id = playlist[0].user_id.trim();
  }

  // return the parsed playlist
  return playlist;
};
