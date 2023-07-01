

const request = require('supertest');
const app = require('../../app');
const db = require("../../config/db");


//test route

// describe('test', () => {
//   it('returns "Hello, world!"', async () => {
//     const res = await request(app).get('/test');
//     expect(res.status).toBe(200); // Check if the response status is 200 (OK)
//     expect(res.text).toBe('hello world'); // Check if the response body is "hello world"
//   });
// });


// get all articles

it('retrieves articles by month', async () => {
  const res = await request(app)
    .get('/articles/user/2')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODgxMzE5MTQsImV4cCI6MTY5NTkwNzkxNH0.vSTBKEH4l9UkfNyts3hZJiuj3tFvx-lLZrP0qv2f7Z0');
  expect(res.status).toBe(200);
  expect(typeof res.body).toBe('object');
}, 10000);



//Test the PUT /:id/status/:userId route
it('updates the status', async () => {
  const res = await request(app)
    .put('/articles/6/status/2')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODgxMzE5MTQsImV4cCI6MTY5NTkwNzkxNH0.vSTBKEH4l9UkfNyts3hZJiuj3tFvx-lLZrP0qv2f7Z0')
    .send({ status: "ממתין" });

  expect(res.status).toBe(200);
  expect(typeof res.body).toBe('object');
});



it('add new article', async () => {
  const res = await request(app)
    .post('/articles/newArticle/')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODgxMzE5MTQsImV4cCI6MTY5NTkwNzkxNH0.vSTBKEH4l9UkfNyts3hZJiuj3tFvx-lLZrP0qv2f7Z0')
    .send({
      client_name: 'test556',
      article_name: 'test787',
      contractor: 'כתבנית',
      article_type: 'מאמר לאתר 300',
      status: 'הוזמן',
      user_id: 2
    });
    

  expect(res.status).toBe(200);
  expect(typeof res.body).toBe('object');
});



it('update article', async () => {
  const res = await request(app)
    .put('/articles/6/user/2')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODgxMzE5MTQsImV4cCI6MTY5NTkwNzkxNH0.vSTBKEH4l9UkfNyts3hZJiuj3tFvx-lLZrP0qv2f7Z0')
    .send({
      client_name: 'test556',
      article_name: 'updated',
      contractor: 'כתבנית',
      article_type: 'מאמר לאתר 300',
    });

  expect(res.status).toBe(200);
  expect(typeof res.body).toBe('object');
});




