const request = require('supertest');
const app = require('../../app');
const { connectToMongoDB, disconnectFromMongoDB } = require('../../services/connect.mongo.js');
const { StatusCodes } = require('http-status-codes');
const Job = require('../../models/Job');
const Candidate = require('../../models/Candidate');
const { getTokens } = require('../../utils/getTokens');
const Application = require('../../models/Application');
const Company = require('../../models/Company');

describe('Test jobs controller', () => {
  const oneYear = 1000 * 60 * 60 * 24 * 365;
  const candidate = {"firstName":"Sydelle","lastName":"Franzonello","email":"sfranzonello0@unicef.org","password":"DnoM9M","phone":"882-398-8565","education":"um venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in","experience":"dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend","birthday":"2013-06-01","aboutMe":"id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed","abilities":["frame","Public-key","disintermediate","Graphical User Interface","User-friendly"], verified: new Date(Date.now())}

  const job = {"title":"Help Desk Operator","description":"uere nonummy integer non velit donec","requirements":"donec diam neque vestibulum","jobTypes":["part-time","full-time"], "companyID":"64785c6e2c8310474ba4b6b0"}

  const company = {"password":"IrTtRDosECE","name":"Voomm","mainHeadquarter":"Ambelón","email":"gwinslet0@usnews.com","aboutUs":"in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec","phone":"230-599-1570", verified: new Date(Date.now()),
  availablePosts: 1000, subscriptionExpiration: new Date(Date.now() + oneYear) }

  const inexistentJobID = '644bc2b5e5981683d2457142', foreignCompanyID = '64785c6e2c8310474ba4b6b0';
  let candID, jobID, compID, accessToken, refreshToken, foreignJobID, candidateAccessToken, candidateRefreshToken;

  beforeAll(async () => {
    await connectToMongoDB();
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
  });

  beforeEach(async () => {
    const curCompany = await Company.create(company);
    compID = curCompany._id;
    const curCandidate = await Candidate.create(candidate);
    candID = curCandidate._id;
    const curJob = await Job.create({ ...job, companyID: compID});
    jobID = curJob._id;
    const foreignJob = await Job.create({ ...job, companyID: foreignCompanyID });
    foreignJobID = foreignJob._id;
    const authResp = await request(app).post('/api/v1/auth/login').send({ ...company, type: 'company' });
    const cookieResult = getTokens(authResp.header['set-cookie']);
    accessToken = cookieResult.accessToken, refreshToken = cookieResult.refreshToken;
    const authResp2 = await request(app).post('/api/v1/auth/login').send({ ...candidate, type: 'candidate' });
    const result = getTokens(authResp2.header['set-cookie']);
    candidateAccessToken = result.accessToken, candidateRefreshToken = result.refreshToken;
  });

  afterEach(async () => {
    await Company.deleteOne({ _id: compID });
    await Candidate.deleteOne({ _id: candID });
    await Job.deleteOne({ _id: jobID });
    await Job.deleteOne({ _id: foreignJobID });
  });

  describe('Test get all jobs', () => {
    test('Get only not applied jobs for a candidate', async () => {
      const applyResp = await request(app)
        .post(`/api/v1/applications/${jobID}`)
        .set('Cookie', [`accessToken=${candidateAccessToken}`, `refreshToken=${candidateRefreshToken}`])
        .expect('Content-Type', /json/);
      expect(applyResp.body.application).toBeDefined();
      const resp = await request(app)
        .get('/api/v1/jobs')
        .set('Cookie', [`accessToken=${candidateAccessToken}`, `refreshToken=${candidateRefreshToken}`])
        .expect('Content-Type', /json/)
      const allJobs = await Job.find();
      expect(resp.body.cnt).toBe(allJobs.length - 1);
      await Application.deleteOne(applyResp.body.application);
    });
  });

  describe('Test create job', () => {
    const validJob = { job };
    const invalidJob = { job: { 
      ...validJob.job,
      experience: 'no experiences',
    }};

    test('Can create job', async () => {
      const resp = await request(app)
        .post('/api/v1/jobs')
        .send(validJob)
        .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.CREATED);
      const curJob = resp.body.job;
      const result = await Job.deleteOne({ _id: curJob._id });
      expect(result.deletedCount).toBe(1);
    });

    test('Cannot create invalid job', async () => {
      await request(app)
        .post('/api/v1/jobs')
        .send(invalidJob)
        .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.BAD_REQUEST);
    });
  });

  describe('Test edit job', () => {
    const validEdit = { job: {
      "benefits": ["mollis molestie", "aliquam augue quam"],
      "experience": "no Experience",
      "companyID": '10299389398334'
    }};

    const badEdit = { job: {
        ...validEdit.job,
        experience: "no Experiences",
      }
    };

    test('Edit inexistent job', async () => {
      const response = await request(app)
        .patch(`/api/v1/jobs/${inexistentJobID}`)
        .send(validEdit)
        .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.NOT_FOUND);
      expect(response.body.msg).toStrictEqual('Job not found');
    });

    test('Try to edit with wrong data', async () => {
      await request(app)
        .patch(`/api/v1/jobs/${jobID}`)
        .send(badEdit)
        .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.BAD_REQUEST);
    });

    test('No permissions to edit job', async () => {
      const response = await request(app)
        .patch(`/api/v1/jobs/${foreignJobID}`)
        .send(validEdit)
        .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.FORBIDDEN);
      expect(response.body.msg).toStrictEqual('You aren`t allowed to modify the job');
    });

    test('Can edit job without modifying the company', async () => {
      const resp = await request(app)
        .patch(`/api/v1/jobs/${jobID}`)
        .send(validEdit)
        .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK);
        console.log(compID.toString(), resp.body.job.companyID.toString());
      expect(resp.body.job.companyID.toString()).toEqual(compID.toString());
    });
  });

  describe('Test can get all candidates', () => {
    test('can get all candidates for an owned job announcement', async () => {
      const applyResp = await request(app)
        .post(`/api/v1/applications/${jobID}`)
        .set('Cookie', [`accessToken=${candidateAccessToken}`, `refreshToken=${candidateRefreshToken}`])
        .expect('Content-Type', /json/);
      const resp = await request(app)
        .get(`/api/v1/jobs/candidates/${jobID}`)
        .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK);
      expect(resp.body.candidates.length).toBe(1);
      await Application.deleteOne(applyResp.body.application);
    });

    test('cannot get the candidates for a foreign job announcement', async () => {
      const applyResp = await request(app)
        .post(`/api/v1/applications/${foreignJobID}`)
        .set('Cookie', [`accessToken=${candidateAccessToken}`, `refreshToken=${candidateRefreshToken}`])
        .expect('Content-Type', /json/);
      const resp = await request(app)
        .get(`/api/v1/jobs/candidates/${foreignJobID}`)
        .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.FORBIDDEN);
      expect(resp.body.msg).toStrictEqual('You aren`t allowed to access the candidates');
      await Application.deleteOne(applyResp.body.application);
    });
  });
});