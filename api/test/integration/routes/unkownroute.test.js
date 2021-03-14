const request = require('supertest');
const authenticate = require('../../../middleware/authenticate');
let server;
let token;
describe('Unkown route', () => {
	beforeAll(() => {
		server = require('../../../server');
		token = authenticate.getToken({ email: 'poorna2152@gmail.com', role: 'admin' });
	});
	afterAll(() => {
		server.close();
	});
	it('Sever should return page not found', async () => {
		const res = await request(server).get('/abc').set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(404);
	});
});
