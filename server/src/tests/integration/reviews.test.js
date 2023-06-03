const request = require('supertest');
const app = require('../../app');
const { connectToMongoDB, disconnectFromMongoDB } = require('../../services/connect.mongo.js');
const { StatusCodes } = require('http-status-codes');
const Candidate = require('../../models/Candidate');
const Company = require('../../models/Company');
const { getTokens } = require('../../utils/getTokens');

describe('Test jobs controller', () => {
  beforeAll(async () => {
    await connectToMongoDB();
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
  });

  describe('Test reviewing functionality', () => {
    const company = {
      "password":"VBzvmOh",
      "name":"Katzzzz",
      "mainHeadquarter":"Lagunas",
      "phone": "0829339273",
      "email":"dgiberd2222@engadget.com",
      "aboutUS":"at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum",
    };
    const candidate = {
      "firstName":"Mac",
      "lastName":"Benoiton",
      "email":"mbenoiton82@a8.net",
      "password":"w5ctsLMV",
      "phone":"560-800-4944",
      "education":"Vitebsk State University",
      "experience":"in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices",
      "birthday":"28-12-2019",
      "aboutMe":"pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate"
    };
    let companyID, candID1, candID2;

    beforeAll(async () => {
      const curCompany = await Company.create({ ...company, verified: new Date(Date.now()) });
      companyID = curCompany._id;
      const cand1 = await Candidate.create({ ...candidate, verified: new Date(Date.now()) });
      const cand2 = await Candidate.create({ ...candidate, email: 'mbenoiton81@a8.net', verified: new Date(Date.now()) });
      candID1 = cand1._id;
      candID2 = cand2._id;
    });

    afterAll(async () => {
      await Company.deleteOne({ _id: companyID });
      await Candidate.deleteMany({ $or: [{ _id: candID1 }, { _id: candID2 }] });
    });

    test('post reviews and calculate the average rating correctly', async () => {
      let accessToken, refreshToken;
      const res1 = await request(app).post('/api/v1/auth/login').send({...candidate, type: 'candidate' });
      const result1 = getTokens(res1.header['set-cookie']);
      accessToken = result1.accessToken, refreshToken = result1.refreshToken;
      const resp1 = await request(app)
        .post(`/api/v1/reviews/${companyID}`)
        .send({ rating: 4 })
        .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK);
      expect(resp1.body.rating).toEqual(4);

      // let actualCompany = await Company.findOne({ _id: companyID });
      // expect(actualCompany.numOfReviews).toEqual(1);
      // expect(actualCompany.averageRating).toEqual(3);
      
      const res2 = await request(app).post('/api/v1/auth/login')
        .send({...candidate, email: 'mbenoiton81@a8.net', type: 'candidate' });
      const result2 = getTokens(res2.header['set-cookie']);
      accessToken = result2.accessToken, refreshToken = result2.refreshToken;
      const resp2 = await request(app)
        .post(`/api/v1/reviews/${companyID}`)
        .send({ rating: 5 })
        .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK);
      expect(resp2.body.rating).toEqual(5);

      const actualCompany = await Company.findOne({ _id: companyID });
      expect(actualCompany.numOfReviews).toEqual(2);
      expect(actualCompany.averageRating).toEqual(4.5);
    });
  });
});