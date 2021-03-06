# Opdracht-2---a-spotify-api-pgm-jamihart

## An API to manage songs and playlists.

By Jamie-Lee Hart

---

---

## Installation & setup

Use `npm i` to install nodemodules and dependencies.

Once installed the API is ready to run.

The API contains a few scripts:

1. Use `npm run dev` in terminal to start the server.
2. Use `npm run seed` in terminal to seed the sqlite 3 database with 50 users, 50 playlists and 100 songs.
3. Use `npm test` in terminal for testing.

**important**

Request test on line 26 should contain a real username and password otherwise mulitple test will fail. First register a new user then fill in criteria `username and password`on line 32 and 33 of request.tes.js

---

---

## Authentication

### 1. Registration

Before using the app a "profile/user" needs to be created.

This is done by a registration request method **POST**.
The registration endpoint: `/auth/register` adds a new user to the database.

To register the user has to fill the body with the following data `name, email, username, password and admin` to the body of the request message.

**Example:**

```json
{
  "user": [
    {
      "name": "example",
      "email": "example@hotmail.com",
      "username": "username",
      "password": "password",
      "admin": "true"
    }
  ]
}
```

The data in the body gets **validated**. this is why the fields must comply with a few factors:

- name: Field must be filled in.
- email: Email must be a valid email
- username: The username must be longer than 5 charachters
- password: The password must be longer than 5 charachters
- admin: Field must be filled in.

If one of the fields doesnt met the criteria the response will be a status code 400 Bad request and an array with what field does not meet the criteria and a message that contains information.

**Example:**

```json
{
  "errors": [
    {
      "value": "a",
      "msg": "Username must contain min. 5 characters !",
      "param": "user[0].username",
      "location": "body"
    }
  ]
}
```

When the registration is succesfull the response will be the password of the user but hashed. This hashed password and the other data-fields (name, username...) will be added to the database. The passwords are hashed because this will ensure that the users passwords are safe if the api's database is ever attacked by hackers.

**Example:**

Hashed-password: `$2b$10$VvBLkZb3Y6DMYV3zXvUysuRbVugSJ5psEBeDSKq0yCEBgc5.3Nh3i`

### 2. Login

To use the app the user needs to login to use the features.

This is done by a login request method **POST**.
The login endpoint: `/auth/login`.

To login the user has to fill the body with the following data `username and password` to the body of the request message.

**Example:**

```json
{
  "username": "username",
  "password": "password"
}
```

#### The data in the body gets validated:

1. if the username is **INCORRECT**, the response will be:

```json
{
  "message": "Invalid username!"
}
```

2. if the password is **INCORRECT**, the response will be:

```json
{
  "message": "Incorrect password!"
}
```

3. if the username and password are **CORRECT**:

The response will contain a JSON Web Token that will be used in the other request methods as a bearer token.

```json
{
  "succes": true,
  "token": "JSON Web Token (jwt)",
  "user": {
    "id": 1518,
    "username": "username",
    "email": "example@hotmail.com",
    "admin": "true"
  }
}
```

---

---

---

## Features

### 1. Use of features

**IMPORTANT! Only authenticated users can use the featers of the api.**

Use the jwt token from the login as a bearer token for authorization. _If you don't do this the response will be_:

```json
{
  "error": "The user has no permission!"
}
```

### 2. SONGS

**IMPORTANT! Only an admin can add, change or delete songs. Members can only get the list of songs**

With **GET** Method a user (admin and user) can get the list of songs and with the **POST** request method the user (admin) can add a new song to the list of songs. With the **PUT** request method the user (admin) can change/ update certain criteria of the song for example to change the title of the song. With the **DELETE** request method the user can delete a certain song from the list.

The endpoint to GET the songs and to POST a song is: `/tracks`.
The endpoint to PUT the songs and to DELETE a song is: `/tracks/:id`.

#### GET

To get the songs the user has to use the jwt token from the login as a bearer token for authorization. If the authorization is succesfull the response will be the list of songs.

#### POST (add)

To add a song the user (admin) has to fill the body with the following data `title, artist and URI` to the body of the request message. For this request authorization is also needed.

**Example:**

```json
{
  "song": [
    {
      "title": "example",
      "artist": "example",
      "URI": "spotify:track:example"
    }
  ]
}
```

The response will contain an object with the id of the new song:

**Example:**

```json
{
  "song": [2480]
}
```

#### PUT (update)

To update a song the user (admin) has to fill the body with the following data `title, artist and URI` to the body of the request message. For this request authorization is also needed.

**Example:**

```json
{
  "song": [
    {
      "title": "new title",
      "artist": "example",
      "URI": "new URI"
    }
  ]
}
```

If succesfull the response will be a status code 200 (ok).

#### DELETE

To delete a song the user (admin) must enter the id of the song at the end of the endpoint:

`/tracks/:id`.

`/tracks/3000`.

For this request authorization is also needed.

**Example:**

If succesfull the response will be a status code 204 (No Content).

---

---

### 3. PLAYLISTS

With **GET** Method a user can get the list of playlists and with the **POST** request method the user can add a new playlist to the list. With the **PUT** request method the user can change/ update certain criteria of the playlist for example to change the title. With the **DELETE** request method the user can delete a certain playlist from the list.

The endpoint to GET the playlists and to POST a playlist is: `/playlist`.
The endpoint to PUT the playlist and to DELETE a playlist is: `/playlist/:id`.

#### GET

To get the playlists the user has to use the jwt token from the login as a bearer token for authorization. If the authorization is succesfull the response will be the list of playlists.

#### POST (add)

To add a playlist the user has to fill the body with the following data `title and user id` to the body of the request message. For this request authorization is also needed.

**Example:**

```json
{
  "playlist": [
    {
      "title": "example",
      "user_id": "301"
    }
  ]
}
```

The response will contain an object with the id of the new playlist:

**Example:**

```json
{
  "playlist": [1490]
}
```

#### PUT (update)

To update a playlist the user has to fill the body with the following data `title and user id` to the body of the request message. For this request authorization is also needed.

**Example:**

```json
{
  "playlist": [
    {
      "title": "updated",
      "user_id": "301"
    }
  ]
}
```

If succesfull the response will be a status code 200 (ok).

#### DELETE

To delete a playlist the user must enter the id of the playlist at the end of the endpoint:

`/playlist/:id`.

`/playlist/3000`.

For this request authorization is also needed.

**Example:**

If succesfull the response will be a status code 204 (No Content).

---

---

### 4. USER

With the **PUT** request method the user can change/ update certain criteria of his/ hers profile for example to change name, username, password or email. With the **DELETE** request method the user can delete his or her account.

The endpoint to PUT the user and to DELETE a user is: `/playlist/:id`.

#### PUT (update)

To update the users profile the user has to fill the body with the following data `name, username, email, password and admin` to the body of the request message. For this request authorization is also needed.

**Example:**

```json
{
  "user": [
    {
      "name": "update user",
      "username": "updated-username",
      "email": "updated@gmail.com",
      "password": "updated-pass",
      "admin": "true"
    }
  ]
}
```

If succesfull the response will be a status code 200 (ok).

#### DELETE

To delete the account the user must enter the id of the user at the end of the endpoint:

`/user/:id`.

`/user/3000`.

For this request authorization is also needed.

**Example:**

If succesfull the response will be a status code 204 (No Content).

---

---

