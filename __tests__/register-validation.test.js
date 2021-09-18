/**
 * Test the register validator 
 */

import request from 'supertest';
import { app } from '../src/index.js'; 

// Testing if the validator correctly validates the criteria
describe("register validator test", () => {

  it("it should return error if input fields are not valid ", async (done) => {
    
    const response = await request(app)
      .post('/auth/register')
      .send({
        "user": [
          {
            name: 'a', // input must be filled 
            email: 'b', // must be a valid email
            username: 'c', // must be longer than 5 characters
            password: 'd', // must be longer than 5 characters
            admin: null // must not be null or false 
          }
        ]
      })
      .set('Accept', 'application/json');

      // Expect the response to be a bad request 
      expect(response.status).toEqual(400);
    done();

  });

});