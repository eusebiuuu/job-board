const request = require('supertest');
const app = require('../../app');
const { connectToMongoDB, disconnectFromMongoDB } = require('../../services/connect.mongo.js');
const { StatusCodes } = require('http-status-codes');
const Candidate = require('../../models/Candidate');
const Application = require('../../models/Application');
const { getTokens } = require('../../utils/getTokens');

describe('Test jobs controller', () => {
  beforeAll(async () => {
    await connectToMongoDB();
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
  });

  describe('Delete candidate properly', () => {
    const candidate = {
      "firstName":"Aubert",
      "lastName":"Katt",
      "email":"akatt555@xing.com",
      "password":"6Lgno1nw",
      "phone":"390-813-3265",
      "education":"Cedarville College",
      "experience":"volutpat dui maecenas tristique est et tempus semper est quam pharetra",
      "birthday":"24-01-2021",
      "aboutMe":"purus phasellus in felis donec semper sapien a libero nam dui proin leo"
    };
    let curCandidateID;
    const foreignCandidateID = '645fc5b5f835fbf1424d275f';
    const validJobID1 = '6460793fff71ed5d0151defb';
    const validJobID2 = '64607940ff71ed5d0151deff';
    let candidateAccessToken, candidateRefreshToken;

    beforeAll(async () => {
      const resp = await Candidate.create({ ...candidate, verified: new Date(Date.now()) });
      curCandidateID = resp._id;
      await Application.create({ candidateID: curCandidateID, jobID: validJobID1 });
      await Application.create({ candidateID: curCandidateID, jobID: validJobID2 });
      const res = await request(app).post('/api/v1/auth/login').send({...candidate, type: 'candidate' });
      const cookies = res.header['set-cookie'];
      const result = getTokens(cookies);
      candidateAccessToken = result.accessToken;
      candidateRefreshToken = result.refreshToken;
      // console.log(candidateAccessToken, candidateRefreshToken);
    });

    afterAll(async () => {
      await Candidate.deleteOne({ _id: curCandidateID });
    });

    test('cannot delete other candidates', async () => {
      await request(app)
        .delete(`/api/v1/candidates/${foreignCandidateID}`)
        .set('Cookie', [`accessToken=${candidateAccessToken}`, `refreshToken=${candidateRefreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.FORBIDDEN);
    });

    test('can delete all data related to the candidate', async () => {
      await request(app)
        .delete(`/api/v1/candidates/${curCandidateID}`)
        .set('Cookie', [`accessToken=${candidateAccessToken}`, `refreshToken=${candidateRefreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK);
      const resp = await Application.find({ candidateID: curCandidateID });
      expect(resp).toHaveLength(0);
    });
  })
});