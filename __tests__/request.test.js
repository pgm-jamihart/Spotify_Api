import request from 'supertest';
import { app } from '../src/index.js'; 

describe('test the app endpoints with HTTP-requests', () => {

  /**
   * Request login 
   */
  it('should return with unauthorized', async (done) => {
    // if the username and password are wrong return 401 unauthorized 
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'wrong',
        password: 'wrong'
      })
      // accept response in json format
      .set('Accept', 'application/json');
    // Expect response to be status unauthorized 
    expect(response.statusCode).toEqual(401);
    done();
  });
  
  let token = '';

  it('should return a jwt token', async (done) => {
    // if the username and password are right return status 200 = ok 
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'jamielee1',
        password: 'jamieleepass1'
      })
      // accept response in json format
      .set('Accept', 'application/json');
    // Expect response to be status OK 
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;

    done();
  });

  /**
   * Request Users 
   */
  it('Should return Users', async (done) => {
    // get users list 
    const response = await request(app)
      .get('/user/')
      .set('Accept', 'application/json')
      // add JWT token to authorization
      .set("Authorization", "Bearer " + token);
    // Expect response to be status OK 
    expect(response.status).toEqual(200);
    // Expect the response to contain users
    expect(response.body).toHaveProperty('users');
    // Expect the response to be an Array
    expect(Array.isArray(response.body.users)).toBe(true);
    done();
  });

  it('Should add user', async (done) => {
    // add a user (change values!)
    const response = await request(app)
      .post('/user/')
      // add JWT token to authorization
      .set("Authorization", "Bearer " + token)
      .send({
        "user": [
          {
            name: "ddddddderzrzer",
            email: "testing@zerzrzesg.com",
            username: "eretetertrert",
            password: "erttetertert",
            admin: "true"
          }
        ]
      })
      .set('Accept', 'application/json')
    // Expect response to be status created
    expect(response.status).toEqual(201);

    done();
  });

  /**
   * Request Songs 
   */

  it('Should return Songs', async (done) => {
    // get song list 
    const response = await request(app)
      .get('/tracks/')
      .set('Accept', 'application/json')
      // add JWT token to authorization
      .set("Authorization", "Bearer " + token);
    // Expect response to be status OK 
    expect(response.status).toEqual(200);
    done();
  });

  it('Should add song', async (done) => {
    // add a song (change values in test!)
    const response = await request(app)
      .post('/tracks/')
      // add JWT token to authorization
      .set("Authorization", "Bearer " + token)
      .send({
        "song": [
          {
            title: 'testing',
            artist: 'testing', 
            URI: 'spotify:track:3ympd4tIxkeLggiov9V5ee', 
          }
        ]
      })
      .set('Accept', 'application/json')
    // Expect response to be status created 
    expect(response.status).toEqual(201);
    done();
  });

  /**
   * Request Playlist
   */

  it('Should return Playlists', async (done) => {
    // get playlist list 
    const response = await request(app)
      .get('/playlist/')
      .set('Accept', 'application/json')
       // add JWT token to authorization
      .set("Authorization", "Bearer " + token);
    // Expect response to be status OK 
    expect(response.status).toEqual(200);
    // Expect the response to contain playlists
    expect(response.body).toHaveProperty('playlists');
    // Expect the response to be an Array
    expect(Array.isArray(response.body.playlists)).toBe(true);
    done();
  });

  it('Should add playlist', async (done) => {
    // add a playlist (change values in test!)
    const response = await request(app)
      .post('/playlist/')
       // add JWT token to authorization
      .set("Authorization", "Bearer " + token)
      .send({
        "playlist": [
          {
            title: "testing",
            user_id: "301"
          }
        ]
      })
      .set('Accept', 'application/json')
    // Expect response to be status created   
    expect(response.status).toEqual(201);
    done();
  });
});