const AmmunitionController = require('../../../controlller/ammunition.controller'); // 1 done StationController > UserController
const { createAmmunitionBatch } = require('../../helpers/factory'); // 2
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const { mockErrorMethod } = require('../../helpers/exceptionThrow');

let server;
describe('Ammunition controller', () => {
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
	let ammoBatch;

	describe('create and delete ammunition batch', () => {
		beforeAll(() => {
			ammoBatch = createAmmunitionBatch();
		});

		afterAll(async () => {
			await destroyFromDB(Models.AmmunitionBatch, ammoBatch, ['ammoModelID', 'orderID']);
		});

		it('should create an ammunition batch', async () => {
			req.body = ammoBatch;

			await AmmunitionController.createAmmunitionBatch(req, res);

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					ammoModelID: ammoBatch.ammoModelID,
					orderID: ammoBatch.orderID,
					count: ammoBatch.count,
					remain: ammoBatch.remain,
				})
			);
		});

		it('should delete an ammunition batch', async () => {
			req.params = { ammoModelID: ammoBatch.ammoModelID, orderID: ammoBatch.orderID };

			await AmmunitionController.deleteAmmunitionBatch(req, res);

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith('Succesfully ammunition batch deleted');
		});
	});

	describe('get and update ammunition batch', () => {
		beforeAll(async () => {
			ammoBatch = await writeToDB(Models.AmmunitionBatch, createAmmunitionBatch());
		});

		afterAll(async () => {
			await destroyFromDB(Models.AmmunitionStation, {...ammoBatch, stationID:1}, ['ammoModelID', 'orderID','stationID']);
			await destroyFromDB(
				Models.AmmunitionBatch,
				{ ammoModelID: ammoBatch.ammoModelID, orderID: ammoBatch.orderID },
				['ammoModelID', 'orderID']
			);

		});

		it('should return the ammunition batch remaining in the station', async () => {
			req.params = { stationID: 1 };

			await AmmunitionController.getAmmunitionStation(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						ammoModelID: expect.any(Number),
						stationID: expect.any(Number),
						count: expect.any(Number),
						allocatedDate: expect.any(String),
						orderID: expect.any(Number),
						remaining: expect.any(Number),
						name: expect.any(String),
						description: expect.any(String),
					}),
				])
			);
		});

		it('should return all ammunition batches', async () => {
			await AmmunitionController.getAmmunitionBatches(req, res); // 1

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						ammoModelID: expect.any(Number),
						orderID: expect.any(Number),
						count: expect.any(Number),
						remain: expect.any(Number),
						supplierID: expect.any(Number),
						date: expect.any(String),
						totalCost: expect.any(Number),
						state: expect.any(String),
						name: expect.any(String),
						description: expect.any(String),
					}),
				])
			);
		});

		it('should update an ammunition batch', async () => {
			req.params = { ammoModelID: ammoBatch.ammoModelID, orderID: ammoBatch.orderID };

			req.body = {
				...createAmmunitionBatch(),
				ammoModelID: ammoBatch.ammoModelID,
				orderID: ammoBatch.orderID,
				Station: [
					{
						ammoModelID: ammoBatch.ammoModelID,
						orderID: ammoBatch.orderID,
						stationID: 1,
						count: 20,
						remaining: 20,
						allocatedDate: '2021-02-10',
					},
				],
			};
			await AmmunitionController.updateAmmunitionBatch(req, res);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					ammoModelID: expect.any(Number),
					orderID: expect.any(Number),
					count: expect.any(Number),
					remain: expect.any(Number),
					Station: expect.arrayContaining([
						expect.objectContaining({
							stationID: expect.any(Number),
							orderID: expect.any(Number),
							count: expect.any(Number),
							ammoModelID: expect.any(Number),
							allocatedDate: expect.any(String),
							remaining: expect.any(Number),
						}),
					]),
				})
			);
		});

		it('shouldnt update an ammunition batch when newly added value is greater than original count', async () => {
			req.params = { ammoModelID: ammoBatch.ammoModelID, orderID: ammoBatch.orderID };

			req.body = {
				...createAmmunitionBatch(),
				ammoModelID: ammoBatch.ammoModelID,
				orderID: ammoBatch.orderID,
				Station: [
					{
						ammoModelID: ammoBatch.ammoModelID,
						orderID: ammoBatch.orderID,
						stationID: 1,
						count: 1000,
						remaining: 1000,
						allocatedDate: '2021-02-10',
					},
				],
			};
			await AmmunitionController.updateAmmunitionBatch(req, res);
			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should update the remaining of a ammunition batch assigned to a station', async () => {
			req.params = { ammoModelID: ammoBatch.ammoModelID };
			req.body = { remaining: 5, stationID: 1, orderID: ammoBatch.orderID };

			await AmmunitionController.updateAmmunitionStation(req, res);

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					ammoModelID: expect.any(Number),
					orderID: expect.any(Number),
					stationID: expect.any(Number),
					remaining: expect.any(Number),
					count: expect.any(Number),
					allocatedDate: expect.any(String),
				})
			);
		});

		it('should get all the stations ammunition batch was assigned to ', async () => {
			req.params = { ammoModelID: ammoBatch.ammoModelID, orderID: ammoBatch.orderID };

			await AmmunitionController.getAmmunitionBatch(req, res);

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						ammoModelID: expect.any(Number),
						orderID: expect.any(Number),
						stationID: expect.any(Number),
						stationName: expect.any(String),
						location: expect.any(String),
						type: expect.any(String),
						contactNo: expect.any(String),
						remaining: expect.any(Number),
						count: expect.any(Number),
						allocatedDate: expect.any(String),
					}),
				])
			);
		});

		it('should not be able to delete the ammoBatch since it has been assigned to station', async () => {
			req.params = { ammoModelID: ammoBatch.ammoModelID, orderID: ammoBatch.orderID };

			await AmmunitionController.deleteAmmunitionBatch(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
	});

	describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Models.AmmunitionBatch);
			mockErrorMethod(Models.AmmunitionStation);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return an error message on sequelize errors for get ammunition batches of a station ', async () => {
			req.body = {};

			await AmmunitionController.getAmmunitionStation(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return an error message on sequelize errors for update of state of a ammunition batch of a station ', async () => {
			req.body = { remaining: 100 };

			await AmmunitionController.updateAmmunitionStation(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return an error message updating other properties without remaining of a ammunition batch of a station ', async () => {
			req.body = {};

			await AmmunitionController.updateAmmunitionStation(req, res);

			expect(res.status).toHaveBeenCalledWith(401);
		});

		it('should return 400 state on get all ammunition batches for errors', async () => {
			req.body = {};

			await AmmunitionController.getAmmunitionBatches(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get ammunition batch for errors', async () => {
			req.body = {};

			await AmmunitionController.getAmmunitionBatch(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on create for errors', async () => {
			req.body = {};

			await AmmunitionController.createAmmunitionBatch(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on update for errors', async () => {
			req.body = {};

			await AmmunitionController.updateAmmunitionBatch(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
		
		it('should return 400 state on delete for errors', async () => {
			req.body = {};

			await AmmunitionController.deleteAmmunitionBatch(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
	});
});
