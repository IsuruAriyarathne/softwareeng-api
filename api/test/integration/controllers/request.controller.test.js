const RequestController = require('../../../controlller/request.controller');
const {
	createStation,
	createWeaponModel,
	createAmmoModel,
	createRequest,
	createRequestAmmunition,
    createRequestWeapon,
} = require('../../helpers/factory');
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');

let server;
let station;
let weaponModels;
let ammoModels;

describe('request controller', () => {
	beforeAll(async () => {
		server = require('../../../server');
		station = await writeToDB(Models.Station, createStation());
		ammoModels = await writeToDB(Models.AmmunitionType, createAmmoModel(3));
		weaponModels = await writeToDB(Models.WeaponModel, createWeaponModel(3));
	});

	afterAll(async () => {
		await destroyFromDB(Models.Station, station, 'stationID');
		await destroyFromDB(Models.AmmunitionType, ammoModels, 'ammoModelID');
		await destroyFromDB(Models.WeaponModel, weaponModels, 'weaponModelID');
		server.close();
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};

	let request;

	describe('get and delete request given by ID', () => {
		beforeAll(async () => {
			request = await writeToDB(
				Models.Request,
				createRequest(station, weaponModels.slice(0, -1), ammoModels.slice(0, -1))
			);
		});

		afterAll(async () => {
			await destroyFromDB(Models.Request, request, 'requestID');
		});

		it('should return request given by ID', async () => {
			req.params = { requestID: request.requestID };

			await RequestController.getRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
		});

		it('should delete a request', async () => {
			req.params = { requestID: request.requestID };

			await RequestController.deleteRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully request deleted');
		});

		it('should update a request', async () => {
			let newRequest = {
				...request,
				AmmunitionRequests: createRequestAmmunition(ammoModels, request.requestID),
				WeaponRequests: createRequestWeapon(weaponModels, request.requestID),
			};
			req.body = newRequest;
			req.params = { requestID: request.requestID };

			await RequestController.updateRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
		});

		it('should get requests of the station', async () => {
			req.params = { stationID: station.stationID };

			await RequestController.getRequestsStation(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
		});
		
        it('should get all requests of the station', async () => {

			await RequestController.getRequests(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
		});
	});

	describe('create request', () => {
		beforeAll(() => {
			request = createRequest(station, weaponModels, ammoModels);
		});

		it('should create a request with both ammoModel and weapon Models', async () => {
			req.body = request;

			await RequestController.createRequest(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
		});		
	});

	// describe('error handling', () => {
	// 	beforeAll(() => {
	// 		Models.Request.create = () => {
	// 			throw new Error();
	// 		};
	// 		Models.Request.findAll = () => {
	// 			throw new Error();
	// 		};
	// 		Models.Request.findOne = () => {
	// 			throw new Error();
	// 		};
	// 		Models.Request.update = () => {
	// 			throw new Error();
	// 		};
	// 		Models.Request.destroy = () => {
	// 			throw new Error();
	// 		};
	// 	});
	// 	afterAll(() => {
	// 		jest.clearAllMocks();
	// 	});

	// it('should return an error message on sequelize errors', async () => {
	// 	req.body = requestWithWeapon;

	// 	await RequestController.createRequest(req, res);

	// 	expect(res.status).toHaveBeenCalledWith(400);
	// });
	// 	it('should return 400 state on create for errors', async () => {
	// 		req.body = requestWithWeapon;

	// 		await RequestController.createRequest(req, res);

	// 		expect(res.status).toHaveBeenCalledWith(400);
	// 	});

	// 	it('should return 400 state on delete for errors', async () => {
	// 		req.body = {};

	// 		await RequestController.deleteRequest(req, res);

	// 		expect(res.status).toHaveBeenCalledWith(400);
	// 	});

	// 	it('should return 400 state on update for errors', async () => {
	// 		req.body = {};

	// 		await RequestController.updateRequest(req, res);

	// 		expect(res.status).toHaveBeenCalledWith(400);
	// 	});

	// 	it('should return 400 state on get request details for errors', async () => {
	// 		req.body = {};

	// 		await RequestController.getRequest(req, res);

	// 		expect(res.status).toHaveBeenCalledWith(400);
	// 	});

	// 	it('should return 400 state on get requests of stations for errors', async () => {
	// 		req.body = {};

	// 		await RequestController.getRequestsStation(req, res);

	// 		expect(res.status).toHaveBeenCalledWith(400);
	// 	});

	// 	it('should return 400 state on get all requests for errors', async () => {
	// 		req.body = {};

	// 		await RequestController.getRequests(req, res);

	// 		expect(res.status).toHaveBeenCalledWith(400);
	// 	});
	// });
});
