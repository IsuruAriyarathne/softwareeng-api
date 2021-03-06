const WeaponController = require('../../../controlller/weapon.controller');  // 1 done StationController > UserController
const { createWeapon } = require('../../helpers/factory') // 2
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');

let server;
describe('weapon controller', () => { // 3 done
	
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
	let weapon;

	describe('get and delete weapons', () => {  // 5 done
		
		beforeEach(async() => {
			weapon = await writeToDB(Models.Weapon,createWeapon())  // 6 half done
		})
		
		afterAll(async() => {
			await destroyFromDB(Models.Weapon,weapon,'weaponID') // 7 done
		});

		it('should return weapons given by ID', async () => {
			req.params = { weaponID: weapon.weaponID };

			const weap = await WeaponController.getWeapon(req, res);
            console.log(weap)
			expect(res.status).toHaveBeenCalledWith(200);
			// expect(res.send).toHaveBeenCalledWith(weapon);
		});		

		it('should return all weapons', async () => {
			await WeaponController.getWeapons(req, res);  // 1
			expect(res.status).toHaveBeenCalledWith(200);
		});

		it('should delete a weapon', async () => {
			req.params = { weaponID: weapon.weaponID };

			await WeaponController.deleteWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully weapon deleted');
		});
	});

	describe('create a weapon', () => {
		req.body = createWeapon()[0];
		it('should create a weapon', async () => {
			await WeaponController.createWeapon(req, res);  // 1
			expect(res.status).toHaveBeenCalledWith(200);
		});
	});
	
});
