const ammoModelController = require('../../../controlller/ammoModel.controller');
const { createAmmoModel } = require('../../helpers/factory');
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');

let server;

describe('ammoModel controller', () => {
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
	let ammoModel;

	describe('get and delete amsoModels', () => {

		beforeAll(async() => {
			ammoModel = await writeToDB(Models.AmmunitionType,createAmmoModel())
		})
		afterAll(async() => {
			await destroyFromDB(Models.AmmunitionType,ammoModel,'ammoModelID')
		})

		// it('should return ammoModel given by ID', async () => {
		// 	req.params = { ammoModelID: ammoModel.ammoModelID }

		// 	await ammoModelController.getAmmoModel(req, res);

		// 	expect(res.status).toHaveBeenCalledWith(200);
		// 	expect(res.send).toHaveBeenCalledWith(ammoModel);
		// });

		it('should return all ammoModels', async () => {
			await ammoModelController.getAmmoModels(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			// expect(res.send).toHaveBeenCalledWith(stations);
		});

		it('should delete a ammoModel', async () => {
			req.params = { ammoModelID: ammoModel.ammoModelID };

			await ammoModelController.deleteAmmoModel(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully ammoModel deleted');
		});
	});

	describe('create a ammoModel', () => {
		beforeAll(() => {
			ammoModel = createAmmoModel()
		})
		afterAll(async() => {
			await destroyFromDB(Models.AmmunitionType,ammoModel,'ammoModelID')
		})

		it('should create a ammoModel', async () => {
			req.body = ammoModel;
			ammoModel = await ammoModelController.createAmmoModel(req, res);
	
			expect(res.status).toHaveBeenCalledWith(200);
		});
	})
	
});
