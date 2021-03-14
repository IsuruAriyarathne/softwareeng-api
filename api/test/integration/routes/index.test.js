const request = require('supertest');
const authenticate = require('../../../middleware/authenticate');
let server;

describe('Log in function', () => {
	beforeAll(() => {
		server = require('../../../server');
	});
	afterAll(() => {
		server.close();
	});
	describe('server proper functioning', () => {
		it('should login a valid user', async () => {
			const res = await request(server).post('/').send({ email: 'poorna2152@gmail.com', password: '123456' });
			expect(res.status).toBe(200);

			expect(res.body).toEqual(
				expect.objectContaining({
					success: true,
					token: expect.any(String),
					type: expect.any(String),
					stationID: expect.any(Number),
				})
			);
		});
		it('should not login an invalid user', async () => {
			const res = await request(server).post('/').send({ email: 'poorna2152@gmail.com', password: '1234' });
			expect(res.status).toBe(200);

			expect(res.body).toEqual(
				expect.objectContaining({
					success: false,
					status: 'Unauthorized!',
				})
			);
		});
		it('should not login an invalid user', async () => {
			const res = await request(server).post('/').send({ email: 'abc@gmail.com', password: '1234' });
			expect(res.status).toBe(200);

			expect(res.body).toEqual(
				expect.objectContaining({
					success: false,
					status: 'Unauthorized!',
				})
			);
		});
	});
	describe('error handle', () => {
		beforeAll(() => {
			authenticate.getToken = () => {
				throw new Error();
			};
		});
		afterAll(() => {
			jest.clearAllMocks();
		});
		it('should return server error login error', async () => {
			const res = await request(server).post('/').send({ email: 'poorna2152@gmail.com', password: '123456' });
			expect(res.status).toBe(400);

			expect(res.body).toEqual(
				expect.objectContaining({
					success: false,
					status: 'Server error!',
				})
			);
		});
	});
});
