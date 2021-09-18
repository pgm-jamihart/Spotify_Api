/**
 * parse the incoming request
 */

export default (request) => {
  const { song } = request.body;

  // validate if we have a song in the body
  if (song == null) {
    throw new Error('The song object was not set!');
  }

  // check if we have a title
  if (song[0].title == null) {
    throw new Error('The song object does not contain a title!');
  }

  // check if we have an artist
  if (song[0].artist == null) {
    throw new Error('The song object does not contain an artist.');
  }

  // check if we have an URI
  if (song[0].URI == null) {
    throw new Error('The song object does not contain an URI.');
  }

  // trim all the white/none characters in our string
  if (song[0].title != null && song[0].artist != null && song[0].URI != null) {
    song.title = song[0].title.trim();
    song.artist = song[0].artist.trim();
    song.URI = song[0].URI.trim();
  }

  // return the parsed song
  return song;
};
