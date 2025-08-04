import request from 'supertest';
import app from '../app';
import { Incident } from '../models/incident';
import { sequelize } from '../config/db';
import { getTokenFromCredentials } from './utils/auth';
import { auth } from '../config/firebase';

let testToken: string;
let testUid: string;

beforeAll(async () => {
 
  testToken = await getTokenFromCredentials(
    process.env.TEST_FIREBASE_EMAIL!,
    process.env.TEST_FIREBASE_PASSWORD!
  );

  const decoded = await auth.verifyIdToken(testToken);
  testUid = decoded.uid;

  await sequelize.sync({ alter: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/incidents', () => {
  it('should reject unauthenticated requests', async () => {
    const res = await request(app)
      .post('/api/incidents')
      .send({ type: 'fall', description: 'Test incident' });
    expect(res.statusCode).toBe(401);
  });

  it('should create an incident with authentication', async () => {
    const res = await request(app)
      .post('/api/incidents')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ type: 'fall', description: 'Test incident' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.type).toBe('fall');
  });
});

describe('POST /api/incidents/:id/summarize', () => {
  let incidentId: number;

  beforeAll(async () => {
    const incident = await Incident.create({
      userId: testUid,
      type: 'fall',
      description: 'Patient fell near the bed.',
    });
    incidentId = incident.id;
  });

  it('should summarize an incident', async () => {
    const res = await request(app)
      .post(`/api/incidents/${incidentId}/summarize`)
      .set('Authorization', `Bearer ${testToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.summary).toBeDefined();
  });
});