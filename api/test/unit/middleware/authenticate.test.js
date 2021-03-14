require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const authenticate = require('../../../middleware/authenticate');
const request = require('supertest');
const Models = require('../../../model');
const { mockErrorMethod } = require('../../helpers/exceptionThrow');

let server;
describe('authentication', () => {
	beforeAll(() => {
		server = require('../../../server');
	});

	afterAll(() => {
		server.close();
	});
	let token;

	describe('database with correct implementation', () => {
		it('should authorize a user with valid token', async () => {
			token = authenticate.getToken({ email: 'poorna2152@gmail.com', role: 'admin' });
			const res = await request(server).get('/officer/ammoModels').set('Authorization', `Bearer ${token}`);
			expect(res.status).toBe(200);
		});
		it('should not authorize a user with invalid token', async () => {
			token = authenticate.getToken({ email: 'poorna212@gmail.com', role: 'admin' });
			const res = await request(server).get('/officer/ammoModels').set('Authorization', `Bearer ${token}`);
			expect(res.status).toBe(401);
		});
	});

		describe('database error', () => {
			beforeAll(() => {
				mockErrorMethod(Models.User);
			});

			afterAll(() => {
				jest.clearAllMocks();
			});

			it('should return server error on database errors', async () => {
				token = authenticate.getToken({ email: 'poorna2152@gmail.com', role: 'admin' });
				const res = await request(server).get('/officer/ammoModels').set('Authorization', `Bearer ${token}`);
				expect(res.status).toBe(500);
			});
			
	});
});
