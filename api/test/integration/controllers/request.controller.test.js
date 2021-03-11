const RequestController = require('../../../controlller/request.controller');
const {
	createRequest,
	createRequestAmmunition,
	createRequestWeapon,
} = require('../../helpers/factory');
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const { mockErrorMethod } = require('../../helpers/exceptionThrow');

let server;

describe('request controller', () => {
	beforeAll(async () => {
		server = require('../../../server');
	});

	afterAll(async () => {
		server.close();
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};

	let request;
	let requestWeapon;
	let requestAmmo;
	describe('create a request', () => {
		beforeAll(() => {
			request = createRequest();
			requestWeapon = createRequestWeapon();
			requestAmmo = createRequestAmmunition();
		});

		afterAll(async () => {
			await destroyFromDB(Models.Request, request, 'requestID');
		});

		it('should create a request', async () => {
			req.body = request;
			req.body.WeaponRequests = requestWeapon;
			req.body.AmmunitionRequests = requestAmmo;
			await RequestController.createRequest(req, res);

			request.requestID = res.send.mock.calls[0][0].requestID;
			requestWeapon[0].requestID = res.send.mock.calls[0][0].requestID;
			requestAmmo[0].requestID = res.send.mock.calls[0][0].requestID;
			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					...request,
					WeaponRequests: expect.arrayContaining([...requestWeapon]),
					AmmunitionRequests: expect.arrayContaining([...requestAmmo]),
				})
			);
		});
	});

	describe('get and delete request given by ID', () => {
		beforeAll(async () => {
			request = await writeToDB(Models.Request, createRequest());
		});

		afterAll(async () => {
			await destroyFromDB(Models.Request, request, 'requestID');
		});

		it('should return request given by ID', async () => {
			req.params = { requestID: request.requestID };

			await RequestController.getRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith({
				...request,
				ammoRequests: expect.any(Array),
				weaponRequests: expect.any(Array),
			});
		});

		it('should update a request', async () => {
			let newRequest = {
				...request,
				requestID: request.requestID,
				AmmunitionRequests: createRequestAmmunition(1, request.requestID),
				WeaponRequests: createRequestWeapon(1, request.requestID),
			};
			req.body = newRequest;
			req.params = { requestID: request.requestID };

			await RequestController.updateRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					requestID: expect.any(Number),
					date: expect.any(String),
					comments: expect.any(String),
					state: expect.any(String),
					stationID: expect.any(Number),
					AmmunitionRequests: expect.any(Array),
					WeaponRequests: expect.any(Array),
				})
			);
		});

		it('should delete a request', async () => {
			req.params = { requestID: request.requestID };
			await RequestController.deleteRequest(req, res);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully request deleted');
		});

		it('should get requests of the station', async () => {
			req.params = { stationID: 1 };

			await RequestController.getRequestsStation(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
		});

		it('should get all requests of the station', async () => {
			await RequestController.getRequests(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
		});
	});

	describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Models.Request);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return an error message on sequelize errors', async () => {
			req.body = request;

			await RequestController.createRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
		it('should return 400 state on create for errors', async () => {
			req.body = request;

			await RequestController.createRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete for errors', async () => {
			req.body = {};

			await RequestController.deleteRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on update for errors', async () => {
			req.body = {};

			await RequestController.updateRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get request details for errors', async () => {
			req.body = {};

			await RequestController.getRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get requests of stations for errors', async () => {
			req.body = {};

			await RequestController.getRequestsStation(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get all requests for errors', async () => {
			req.body = {};

			await RequestController.getRequests(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
	});
});
