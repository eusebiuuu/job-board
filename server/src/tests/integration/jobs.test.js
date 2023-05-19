const request = require('supertest');
const app = require('../../app');
const { connectToMongoDB, disconnectFromMongoDB } = require('../../services/connect.mongo.js');
const { StatusCodes } = require('http-status-codes');
const Job = require('../../models/Job');

describe('Test jobs controller', () => {
  beforeAll(async () => {
    await connectToMongoDB();
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
  });

  const candidateAccessToken = 's%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJKb2UgQmlsbHkiLCJlbWFpbCI6InJpbWJvaS5ldXNlYml1QGNvbGVnaXVsY29kcmVhbnUucm8iLCJ0eXBlIjoiY2FuZGlkYXRlIiwidXNlcklEIjoiNjQ1YmEyYmU2NThiNDVjYjJkZDc3MzU5In0sImlhdCI6MTY4NDA2ODAwOX0.OikTjOLhf1n1BtMWu4wy9aL_433vkkwDX9ksB6FSKOI.%2BM7wlQ5eukVKkoeJr%2Bt0j%2BAiFiQ6Dp5WSAtA9zrsts4';
  const candidateRefreshToken = 's%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJKb2UgQmlsbHkiLCJlbWFpbCI6InJpbWJvaS5ldXNlYml1QGNvbGVnaXVsY29kcmVhbnUucm8iLCJ0eXBlIjoiY2FuZGlkYXRlIiwidXNlcklEIjoiNjQ1YmEyYmU2NThiNDVjYjJkZDc3MzU5In0sInJlZnJlc2hUb2tlbiI6ImJhZDJjYzQ5ZWFkNjQ3ZTJiMjIzM2NiYjRiMjY1NTVlOTY2MWY2YjQ1MjhiOWQ0MzMxNTMwMTk0NGY5MyIsImlhdCI6MTY4NDA2ODAwOX0.SmSVmbd77nFaFX9y0d_xLO5_Zq2TyErXACpOWgddE1Q.xlEs%2Fj%2BYpj5hzJ0KaHBl%2B3RhDc%2B%2Bqigox04FdUJmaF8';

  describe('Test get all jobs', () => {
    test('Can get all jobs', async () => {
      const resp = await request(app).get('/api/v1/jobs?page=2&limit=10').expect('Content-Type', /json/).expect(StatusCodes.OK);
      expect(resp.cnt === 10);
    });
    test('Inexistent page in URI', async () => {
      const resp = await request(app).get('/api/v1/jobs?page=1000&limit=10').expect('Content-Type', /json/).expect(StatusCodes.OK);
      expect(resp.body.cnt).toBe(0);
    });
    test('Get only not applied jobs for candidates', async () => {
      const resp = await request(app)
        .get('/api/v1/jobs')
        .set('Cookie', [`accessToken=${candidateAccessToken}`, `refreshToken=${candidateRefreshToken}`])
        .expect('Content-Type', /json/)
      const allJobs = await Job.find();
      expect(resp.body.cnt).toBeLessThan(allJobs.length);
    })
  });

  const companyAccessToken = 's%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJTdXBlcmJldCIsImVtYWlsIjoicmltYm9pLmV1c2ViaXVAY29sZWdpdWxjb2RyZWFudS5ybyIsInR5cGUiOiJjb21wYW55IiwidXNlcklEIjoiNjQ1Y2M5ZWFiMzJhMjdhNjVlMWZlYTVmIn0sImlhdCI6MTY4NDEzMjU0M30.nv2PUf0GHqXzve7fM9o3ZhqatWnTtHDHCgtZy71C_5o.pZvU4kcZdDQoSiYliMstQy3YTXF3ZjK%2Fox8K1Vtuqk8';
  const companyRefreshToken = 's%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJTdXBlcmJldCIsImVtYWlsIjoicmltYm9pLmV1c2ViaXVAY29sZWdpdWxjb2RyZWFudS5ybyIsInR5cGUiOiJjb21wYW55IiwidXNlcklEIjoiNjQ1Y2M5ZWFiMzJhMjdhNjVlMWZlYTVmIn0sInJlZnJlc2hUb2tlbiI6Ijc1ODQwNmUwMWE4N2QxMzgwNjM1NDFhNTVjODc3NzAzZGVkZTdmNmI2MjcyOTVkYmJkZmE0ODIwZTFmYyIsImlhdCI6MTY4NDEzMjU0M30.tq8HjG1Ej-lTrRwnDyE9-HOwFOEzAzUN7nOxfhFkbak.qf4Nj7pOMjKbAHUmx3ymc2TSlPkYBIPSMp9S2eVZj9U';
  const curCompanyID = '645cc9eab32a27a65e1fea5f';
  const foreignCompanyID = '64606740ccbf7ec0988ba8b3';

  describe('Test create job', () => {
    const validJob = { job: {
      "minSalary":612,
      "title":"Automation Specialist I",
      "description":"non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis",
      "requirements":"convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis",
      "jobTypes":["internship"],
    }}
    const invalidJob = { job: { 
      ...validJob.job,
      experience: 'no experiences',
    }};

    test('Can create job', async () => {
      const resp = await request(app)
        .post('/api/v1/jobs')
        .send(validJob)
        .set('Cookie', [`accessToken=${companyAccessToken}`, `refreshToken=${companyRefreshToken}`])
        .expect('Content-Type', /json/)
        .expect(201);
      const curJob = resp.body.job;
      const result = await Job.deleteOne({ _id: curJob._id });
      expect(result.deletedCount).toBe(1);
    });

    test('Cannot create invalid job', async () => {
      await request(app)
        .post('/api/v1/jobs')
        .send(invalidJob)
        .set('Cookie', [`accessToken=${companyAccessToken}`, `refreshToken=${companyRefreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.BAD_REQUEST);
      const result = await Job.findOne({ experience: 'no experiences' });
      expect(result).toBeNull();
    });
  });

  describe('Test edit job', () => {
    const newJob = { job: {
      "minSalary":1758,
      "title":"Sales Associate",
      "description":"nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus",
      "requirements":"tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel",
      "jobTypes":["part-time","full-time"],
      "companyID": curCompanyID,
    }};
    const newForeignJob = { ...newJob, job: { ...newJob.job }};
    newForeignJob.job.companyID = foreignCompanyID;
    let resp1, resp2;

    beforeAll(async () => {
      resp1 = await Job.create(newJob.job);
      resp2 = await Job.create(newForeignJob.job);
    });

    afterAll(async () => {
      await Job.deleteOne({ _id: resp1._id });
      await Job.deleteOne({ _id: resp2._id });
    });

    const validEdit = { job: {
      "benefits": ["mollis molestie", "aliquam augue quam"],
      "experience": "no Experience",
      "companyID": foreignCompanyID
    }}
    const badEdit = { job: {
        ...validEdit.job,
        experience: "no Experiences",
      }
    }
    const badID = '644bc2b5e5981683d2457142';

    test('Edit inexistent job', async () => {
      const response = await request(app)
        .patch(`/api/v1/jobs/${badID}`)
        .send(validEdit)
        .set('Cookie', [`accessToken=${companyAccessToken}`, `refreshToken=${companyRefreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.NOT_FOUND);
      expect(response.body.msg).toStrictEqual('Job not found');
    });

    test('Bad edit', async () => {
      const validID = resp1._id;
      await request(app)
        .patch(`/api/v1/jobs/${validID}`)
        .send(badEdit)
        .set('Cookie', [`accessToken=${companyAccessToken}`, `refreshToken=${companyRefreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.BAD_REQUEST);
    });

    test('No permissions to edit job', async () => {
      const response = await request(app)
        .patch(`/api/v1/jobs/${resp2._id}`)
        .send(validEdit)
        .set('Cookie', [`accessToken=${companyAccessToken}`, `refreshToken=${companyRefreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.FORBIDDEN);
      expect(response.body.msg).toStrictEqual('You aren`t allowed to modify the job');
    });

    test('Can edit job without modifying the company', async () => {
      const validID = resp1._id;
      const resp = await request(app)
        .patch(`/api/v1/jobs/${validID}`)
        .send(validEdit)
        .set('Cookie', [`accessToken=${companyAccessToken}`, `refreshToken=${companyRefreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK);
      expect(resp.body.job.companyID).toBe(curCompanyID);
    });
  });

  describe('Test can get all candidates', () => {
    const validJobID = '64607940ff71ed5d0151df0b';
    const forbiddenJobID = '6460793fff71ed5d0151defb';
    
    test('can get all candidates for an owned job announcement', async () => {
      const resp = await request(app)
        .get(`/api/v1/jobs/candidates/${validJobID}`)
        .set('Cookie', [`accessToken=${companyAccessToken}`, `refreshToken=${companyRefreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK);
      expect(resp.body.candidates.length).toBeGreaterThan(0);
    });

    test('cannot get the candidates for a foreign job announcement', async () => {
      const resp = await request(app)
        .get(`/api/v1/jobs/candidates/${forbiddenJobID}`)
        .set('Cookie', [`accessToken=${companyAccessToken}`, `refreshToken=${companyRefreshToken}`])
        .expect('Content-Type', /json/)
        .expect(StatusCodes.FORBIDDEN);
      expect(resp.body.msg).toStrictEqual('You aren`t allowed to access the candidates');
    });
  });
});