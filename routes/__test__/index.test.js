

const request = require('supertest');
const app = require('../../app');
const db = require("../../config/db");








describe('test', () => {
  it('returns "Hello, world!"', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(200); // Check if the response status is 200 (OK)
    expect(res.text).toBe('hello world'); // Check if the response body is "hello world"
  });
});






// it('retrieves articles by month and user ID', async () => {
//     const res = await request(app)
//       .get('/articles/user/1')
//       .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODgxMzE5MTQsImV4cCI6MTY5NTkwNzkxNH0.vSTBKEH4l9UkfNyts3hZJiuj3tFvx-lLZrP0qv2f7Z0');
//       expect(res.status).toBe(200);  
//       expect(typeof res.body).toBe('object');
//   }, 10000);



// it('retrieves articles by month and user ID', async () => {
//     const res = await request(app)
//       .get('/articles/test/2')
//       .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODgxMzE5MTQsImV4cCI6MTY5NTkwNzkxNH0.vSTBKEH4l9UkfNyts3hZJiuj3tFvx-lLZrP0qv2f7Z0');
//     expect(res.status).toBe(200);
//     expect(res.text).toBe('hello world'); // Check if the response status is 200 (OK)
//     // Add additional assertions as per your requirements
//   });


