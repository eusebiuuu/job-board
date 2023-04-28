const request = require('supertest');
const app = require('../app');
const { connectToMongoDB, disconnectFromMongoDB } = require('../services/connect.mongo.js');

describe('Test jobs controller', () => {
  beforeAll(async () => {
    await connectToMongoDB();
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
  });

  describe('Test get all jobs', () => {
    test('Can get all jobs', async () => {
      const response = await request(app).get('/api/v1/jobs').expect('Content-Type', /json/).expect(200);
    })
  })
})