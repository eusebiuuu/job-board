const request = require('supertest');
const app = require('../../app');
const { connectToMongoDB, disconnectFromMongoDB } = require('../../services/connect.mongo.js');
const { StatusCodes } = require('http-status-codes');

describe('Test jobs controller', () => {
  beforeAll(async () => {
    await connectToMongoDB();
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
  });

  describe('Test get all jobs', () => {
    test('Can get all jobs', async () => {
      await request(app).get('/api/v1/jobs').expect('Content-Type', /json/).expect(200);
    });
  });

  describe('Test create job', () => {
    const validJob = {
      job: {
        title: "Job 10",
        description: "djeofjore f9refuh 9wejf9refhur",
        minSalary: 5000,
        benefits: ["deidj idjde", "ijded owsw sjw"],
        experience: "no Experience",
        requirements: "diduew wdiejdu widjwede edje9wd"
      }
    }
    const invalidID = '12345';
    const invalidJob = { job: { 
      ...validJob.job,
      companyID: invalidID,
      badField: 'bad data' 
    }};

    test('Can create job', async () => {
      await request(app)
        .post('/api/v1/jobs')
        .send(validJob)
        .expect('Content-Type', /json/)
        .expect(201);
    });

    test('Ignore bad data provided', async () => {
      const response = await request(app)
        .post('/api/v1/jobs')
        .send(invalidJob)
        .expect('Content-Type', /json/)
        .expect(201);
      expect(response.companyID !== invalidID);
      expect(response.badField).toBeUndefined();
    });
  });

  describe('Test edit job', () => {
    const editedJob = { job: {
        "benefits": ["deidj idjde", "ijded owsw sjw"],
        "experience": "no Experience",
        "requirements": "diduew wdiejdu widjwede edje9wd",
        "companyID": "643e2fe56955b36ee7f8cca4",
      }
    }
    const badJob = { job: {
        ...editedJob.job,
        experience: "no Experiences",
      }
    }
    const badID = '644bc2b5e5981683d2457142';
    const validID = '644bc2b5e5981683d2457141';

    test('Test edit inexistent job', async () => {
      const response = await request(app)
        .patch(`/api/v1/jobs/${badID}`)
        .send(editedJob)
        .expect('Content-Type', /json/)
        .expect(StatusCodes.NOT_FOUND);
      expect(response.body.msg).toStrictEqual('Job not found');
    });

    test('Test bad edit', async () => {
      await request(app)
        .patch(`/api/v1/jobs/${validID}`)
        .send(badJob)
        .expect('Content-Type', /json/)
        .expect(StatusCodes.BAD_REQUEST);
    });

    // test('No permissions to edit job', async () => {
    //   const response = await request(app)
    //     .patch(`/api/v1/jobs/${validID}`)
    //     .send(notAllowedJob)
    //     .expect('Content-Type', /json/)
    //     .expect(StatusCodes.FORBIDDEN);
    //   expect(response.body.msg).toStrictEqual('You aren`t allowed to modify the job');
    // });

    test('Can edit job', async () => {
      await request(app)
        .patch(`/api/v1/jobs/${validID}`)
        .send(editedJob)
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK);
    });
  });
});