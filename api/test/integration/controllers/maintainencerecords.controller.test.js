const MaintainanceRecordController = require('../../../controlller/maintainanceRecords.controller');
const { createMaintainanceRecords } = require('../../helpers/factory');
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const { mockErrorMethod } = require('../../helpers/exceptionThrow');
let server;

describe('maintainance record controller', () => {
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

	let record;

	describe('create a maintenace record', () => {
		beforeAll(() => {
			record = createMaintainanceRecords();
		});
		afterAll(async () => {
			await destroyFromDB(Models.MaintainanceRecord, record, 'id');
		});

		it('should create a maintenance record', async () => {
			req.body = record;

			await MaintainanceRecordController.createMaintainanceRecord(req, res);

			record.id = res.send.mock.calls[0][0].id;

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					id: expect.any(Number),
					description: expect.any(String),
					date: expect.any(String),
					amount: expect.any(Number),
					weaponID: expect.any(Number),
				})
			);
		});
	});

	describe('get and delete stations', () => {
		beforeAll(async () => {
			record = await writeToDB(Models.MaintainanceRecord, createMaintainanceRecords());
		});
		afterAll(async () => {
			await destroyFromDB(Models.MaintainanceRecord, record, 'id');
		});

		it('should return maintenance records', async () => {
			await MaintainanceRecordController.getMaintainanceRecords(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: expect.any(Number),
						description: expect.any(String),
						date: expect.any(String),
						amount: expect.any(Number),
						weaponID: expect.any(Number),
						weaponModelID: expect.any(Number),
						orderID: expect.any(Number),
						state: expect.any(String),
						name: expect.any(String),
					}),
				])
			);
		});

		it('should return maintenance records of a station', async () => {
			req.params = { stationID: 1 };
			await MaintainanceRecordController.getStationMaintainanceRecords(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: expect.any(Number),
						description: expect.any(String),
						date: expect.any(String),
						amount: expect.any(Number),
						weaponID: expect.any(Number),
						weaponModelID: expect.any(Number),
						orderID: expect.any(Number),
						state: expect.any(String),
						name: expect.any(String),
					}),
				])
			);
		});

		it('get maintainance records of a weapon', async () => {
			req.params = { weaponID: 1 };

			await MaintainanceRecordController.getWeaponMaintainanceRecords(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: expect.any(Number),
						description: expect.any(String),
						date: expect.any(String),
						amount: expect.any(Number),
						weaponID: expect.any(Number),
					}),
				])
			);
		});

		it('should update a maintenance record', async () => {
			
            req.body = { ...createMaintainanceRecords(), id: record.id };
			req.params = { id: record.id };

			await MaintainanceRecordController.updateMaintainanceRecord(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					id: expect.any(Number),
					description: expect.any(String),
					date: expect.any(String),
					amount: expect.any(Number),
					weaponID: expect.any(Number),
				})
			);
		});

		it('should delete maintenace record', async () => {
			req.params = { id: record.id };

			await MaintainanceRecordController.deleteMaintainanceRecord(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully maintainance record deleted');
		});
	});

	describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Models.MaintainanceRecord);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return an error message on sequelize errors for get maintainance record of a weapon', async () => {
			req.body = {};

			await MaintainanceRecordController.getWeaponMaintainanceRecords(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return an error message on sequelize errors for get maintainance record of a station', async () => {
			req.body = {};

			await MaintainanceRecordController.getStationMaintainanceRecords(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get all maintenance records for errors', async () => {
			req.body = {};

			await MaintainanceRecordController.getMaintainanceRecords(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on create for errors', async () => {
			req.body = {};

			await MaintainanceRecordController.createMaintainanceRecord(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on update for errors', async () => {
			req.body = {};

			await MaintainanceRecordController.updateMaintainanceRecord(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete station details for errors', async () => {
			req.body = {};

			await MaintainanceRecordController.deleteMaintainanceRecord(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
	});
});
