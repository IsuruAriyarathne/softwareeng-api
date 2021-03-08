const weaponModelController = require('../../../controlller/weaponModel.controller');
const { createWeaponModel } = require('../../helpers/factory');
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const { mockErrorMethod } = require('../../helpers/exceptionThrow');

let server;

describe('WeaponModel controller', () => {
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

	let weaponModel;

	describe('get and delete weaponModels', () => {
		beforeAll(async () => {
			weaponModel = await writeToDB(Models.WeaponModel, createWeaponModel());
		});

		afterAll(async () => {
			await destroyFromDB(Models.WeaponModel, weaponModel, 'weaponModelID');
		});

		it('should return all Weapon Models', async () => {
			await weaponModelController.getWeaponModels(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						weaponModelID: expect.any(Number),
						name: expect.any(String),
						description: expect.any(String),
					}),
				])
			);
		});

		it('should delete a Weapon Model', async () => {
			req.params = { weaponModelID: weaponModel.weaponModelID };

			await weaponModelController.deleteWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully WeaponModel deleted');
		});
	});

	describe('update and get a weaponModel', () => {

		beforeAll(async () => {
			weaponModel = await writeToDB(Models.WeaponModel, createWeaponModel());
		});

		afterAll(async () => {
			await destroyFromDB(Models.WeaponModel, weaponModel, 'weaponModelID');
		});

		it('should update an WeaponModel', async () => {
			req.params = { weaponModelID: weaponModel.weaponModelID };
			req.body = {...weaponModel,AmmunitionTypes: [{weaponModelID: weaponModel.weaponModelID, ammoModelID:1}]};

			await weaponModelController.updateWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					weaponModelID: weaponModel.weaponModelID,
					name: req.body.name,
					description: req.body.description,
					AmmunitionTypes: expect.arrayContaining([
						expect.objectContaining({
							ammoModelID: 1,
							weaponModelID: weaponModel.weaponModelID,
						}),
					]),
				})
			);
		});

		it('should return weaponModel given by ID', async () => {
			req.params = { weaponModelID: weaponModel.weaponModelID };

			await weaponModelController.getWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						weaponModelID: weaponModel.weaponModelID,
						ammoModelID: 1,
						name: expect.any(String),
						description: expect.any(String),
					}),
				])
			);
		});
		
		it('should delete a ammunition type associated with weapon Model', async () => {
			req.params = { weaponModelID: weaponModel.weaponModelID, ammoModelID: 1 };

			await weaponModelController.deleteAmmunitionType(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully Ammunition Type deleted');
		});
	});

	describe('create a Weapon Model', () => {
		beforeAll(() => {
			weaponModel = createWeaponModel();
		});

		afterAll(async () => {
			await destroyFromDB(Models.WeaponModel, weaponModel, 'weaponModelID');
		});

		it('should create a weaponModel', async () => {
			req.body = weaponModel;
			await weaponModelController.createWeaponModel(req, res);
			
			weaponModel.weaponModelID = res.send.mock.calls[5][0].weaponModelID
			
			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					weaponModelID: expect.any(Number),
					name: weaponModel.name,
					description: weaponModel.description,
				})
			);
		});
	});

	describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Models.WeaponModel);
			mockErrorMethod(Models.WeaponAmmunition);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return an error message on sequelize errors for get weapon Model', async () => {
			req.body = {};

			await weaponModelController.getWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get all weapon Models for errors', async () => {
			req.body = {};

			await weaponModelController.getWeaponModels(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on create for errors', async () => {
			req.body = {};

			await weaponModelController.createWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on update for errors', async () => {
			req.body = {};

			await weaponModelController.updateWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete weapon model details for errors', async () => {
			req.body = {};

			await weaponModelController.deleteWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete weapon ammunition errors', async () => {
			req.body = {};

			await weaponModelController.deleteAmmunitionType(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
	});
});
