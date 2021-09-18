/**
 * parse the incoming request
 */

export default (request) => {
  const { user } = request.body;

  // validate if we have a user in the body
  if (user == null) {
    throw new Error('The user object was not set!');
  }

  // check if we have a name
  if (user[0].name == null) {
    throw new Error('The user object does not contain a name!');
  }

  // check if we have a username
  if (user[0].username == null) {
    throw new Error('The user object does not contain a username!');
  }

  // check if we have an email
  if (user[0].email == null) {
    throw new Error('The user object does not contain an email.');
  }

  // check if we have an admin
  if (user[0].admin == null) {
    throw new Error('The user object does not contain an admin.');
  }

  // check if we have an password
  if (user[0].password == null) {
    throw new Error('The user object does not contain an password.');
  }

  // trim all the white/none characters in our string
  if (user[0].name != null && user[0].username != null && user[0].email != null && user[0].admin != null && user[0].password != null) {
    user.name = user[0].name.trim();
    user.username = user[0].username.trim();
    user.email = user[0].email.trim();
    user.admin = user[0].admin.trim();
    user.password = user[0].password.trim();
  }

  // return the parsed user
  return user;
};
