const ammoModelController = require('../../../controlller/ammoModel.controller');
const { createAmmoModel, createWeaponAmmunition, createWeaponModel } = require('../../helpers/factory');
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const { mockErrorMethod } = require('../../helpers/exceptionThrow');

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
	let weaponModel;

	describe('get and delete ammoModels', () => {
		beforeAll(async () => {
			ammoModel = await writeToDB(Models.AmmunitionType, createAmmoModel());
		});

		afterAll(async () => {
			await destroyFromDB(Models.AmmunitionType, ammoModel, 'ammoModelID');
		});

		it('should return all ammoModels', async () => {
			await ammoModelController.getAmmoModels(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						ammoModelID: expect.any(Number),
						name: expect.any(String),
						description: expect.any(String),
					}),
				])
			);
		});

		it('should delete a ammoModel', async () => {
			req.params = { ammoModelID: ammoModel.ammoModelID };

			await ammoModelController.deleteAmmoModel(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully ammoModel deleted');
		});
	});

	describe('update and get a ammoModel', () => {

		beforeAll(async () => {
			ammoModel = await writeToDB(Models.AmmunitionType, createAmmoModel());
			weaponModel = await writeToDB(Models.WeaponModel, createWeaponModel());
		});

		afterAll(async () => {
			await destroyFromDB(Models.AmmunitionType, ammoModel, 'ammoModelID');
			await destroyFromDB(Models.WeaponModel, weaponModel, 'weaponModelID');
		});

		it('should update an ammoModel', async () => {
			req.params = { ammoModelID: ammoModel.ammoModelID };
			req.body = ammoModel;
			req.body.WeaponModels = createWeaponAmmunition(weaponModel.weaponModelID, ammoModel.ammoModelID);

			await ammoModelController.updateAmmoModel(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					ammoModelID: ammoModel.ammoModelID,
					name: req.body.name,
					description: req.body.description,
					WeaponModels: expect.arrayContaining([
						expect.objectContaining({
							ammoModelID: ammoModel.ammoModelID,
							weaponModelID: weaponModel.weaponModelID,
						}),
					]),
				})
			);
		});

		it('should return ammoModel given by ID', async () => {
			req.params = { ammoModelID: ammoModel.ammoModelID };

			await ammoModelController.getAmmoModel(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						ammoModelID: ammoModel.ammoModelID,
						weaponModelID: expect.any(Number),
						name: expect.any(String),
						description: expect.any(String),
					}),
				])
			);
		});
		
		it('should delete a weapon model associated with ammo Model', async () => {
			req.params = { ammoModelID: ammoModel.ammoModelID, weaponModelID: weaponModel.weaponModelID };

			await ammoModelController.deleteWeaponAmmunition(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully ammoModel deleted');
		});
	});

	describe('create a ammoModel', () => {
		beforeAll(() => {
			ammoModel = createAmmoModel();
		});

		afterAll(async () => {
			await destroyFromDB(Models.AmmunitionType, ammoModel, 'ammoModelID');
		});

		it('should create a ammoModel', async () => {
			req.body = ammoModel;
			await ammoModelController.createAmmoModel(req, res);
			ammoModel.ammoModelID = res.send.mock.calls[5][0].ammoModelID
			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					ammoModelID: expect.any(Number),
					name: ammoModel.name,
					description: ammoModel.description,
				})
			);
		});
	});

	describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Models.AmmunitionType);
			mockErrorMethod(Models.WeaponAmmunition);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return an error message on sequelize errors for get ammoModels', async () => {
			req.body = {};

			await ammoModelController.getAmmoModels(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get all ammoModels for errors', async () => {
			req.body = {};

			await ammoModelController.getAmmoModel(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on create for errors', async () => {
			req.body = {};

			await ammoModelController.createAmmoModel(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on update for errors', async () => {
			req.body = {};

			await ammoModelController.updateAmmoModel(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete request details for errors', async () => {
			req.body = {};

			await ammoModelController.deleteAmmoModel(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete weapon ammunition errors', async () => {
			req.body = {};

			await ammoModelController.deleteWeaponAmmunition(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
	});
});
