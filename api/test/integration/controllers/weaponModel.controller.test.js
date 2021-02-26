const WeaponModelController = require('../../../controlller/weaponModel.controller');  
const { createWeaponModel } = require('../../helpers/factory') // 2
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');

let server;
describe('user controller', () => { // 3 done
	
	beforeAll(async () => {
		server = require('../../../server');
	});

	afterAll(async() => {
	    server.close()
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};
	let weaponModel;

	describe('get and delete weaponModels', () => {  // 5 done
		
		beforeEach(async() => {
			weaponModel = await writeToDB(Models.WeaponModel,createWeaponModel())  // 6 half done
		})
		
		afterAll(async() => {
			await destroyFromDB(Models.WeaponModel,weaponModel,'weaponModelID') // 7 done
		});

		it('should return weaponModels given by ID', async () => {
			req.params = { weaponModelID: weaponModel.weaponModelID };

			await WeaponModelController.getWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			// expect(res.send).toHaveBeenCalledWith(weaponModel);
		});		

		it('should return all weaponModels', async () => {
			await WeaponModelController.getWeaponModels(req, res);  // 1
			expect(res.status).toHaveBeenCalledWith(200);
		});

		it('should delete a weaponModel', async () => {
			req.params = { weaponModelID: weaponModel.weaponModelID };

			await WeaponModelController.deleteWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully WeaponModel deleted');
		});
	});

	describe('create a weaponModel', () => {
		req.body = createWeaponModel()[0];
		it('should create a weaponModel', async () => {
			await WeaponModelController.createWeaponModel(req, res);  // 1
			expect(res.status).toHaveBeenCalledWith(200);
		});
	});
	
});
