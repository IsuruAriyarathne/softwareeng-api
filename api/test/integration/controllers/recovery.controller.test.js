const RecoveryController = require('../../../controlller/recovery.controller'); // 1 done StationController > UserController
const { createWeapon } = require('../../helpers/factory'); // 2
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const {mockErrorMethod} = require('../../helpers/exceptionThrow')

let server;

describe('Recovery controller', () => {
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
	let weapon;

	describe('create a weapon', () => {
		beforeAll(() => {
			weapon = createWeapon();
		});

		afterAll(async () => {
			await destroyFromDB(Models.Weapon, weapon, 'weaponID');
		});

		it('should create a weapon', async () => {
			req.body = weapon;

			await RecoveryController.createWeapon(req, res);

			weapon.weaponID = res.send.mock.calls[0][0].weaponID;

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					weaponID: expect.any(Number),
					weaponModelID: weapon.weaponModelID,
					orderID: weapon.orderID,
					state: weapon.state,
				})
			);
		});

		it('should delete a weapon', async () => {
			req.params = { weaponID: weapon.weaponID };

			await RecoveryController.deleteWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith('Succesfully weapon deleted');
		});
	});

	describe('get and delete weapons', () => {
		beforeAll(async () => {
			weapon = await writeToDB(Models.Weapon, createWeapon());
			console.log(weapon);
		});

		afterAll(async () => {
			await destroyFromDB(Models.WeaponStation, { weaponID: weapon.weaponID, stationID: 1 }, [
				'weaponID',
				'stationID',
			]);
			await destroyFromDB(Models.Weapon, weapon, 'weaponID');
		});

		it('should return the stations the weapon was assigned to given weaponID ', async () => {
			req.params = { weaponID: 1 };

			await RecoveryController.getWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						weaponID: expect.any(Number),
						stationID: expect.any(Number),
						assigned: expect.any(Number),
						assignedDate: expect.any(String),
						stationName: expect.any(String),
						location: expect.any(String),
						type: expect.any(String),
						contactNo: expect.any(String),
					}),
				])
			);
		});

		it('should return all weapons', async () => {
			await RecoveryController.getWeapons(req, res); // 1

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						weaponID: expect.any(Number),
						weaponModelID: expect.any(Number),
						orderID: expect.any(Number),
						state: expect.any(String),
						name: expect.any(String),
						description: expect.any(String),
					}),
				])
			);
		});

		it('should update a weapon', async () => {
			req.params = { weaponID: weapon.weaponID };
			req.body = {
				...createWeapon(),
				weaponID: weapon.weaponID,
				Station: [{ weaponID: weapon.weaponID, stationID: 1, assigned: 1, assignedDate: '2021-02-10' }],
			};
			await RecoveryController.updateWeapon(req, res);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					weaponID: expect.any(Number),
					weaponModelID: expect.any(Number),
					orderID: expect.any(Number),
					state: expect.any(String),
					Station: expect.arrayContaining([
						expect.objectContaining({
							stationID: expect.any(Number),
							weaponID: expect.any(Number),
							assigned: 1,
							assignedDate: expect.any(String),
						}),
					]),
				})
			);
		});

		it('should update the state of a weapon assigned to a station', async () => {
			req.params = { weaponID: weapon.weaponID };
			req.body = { state: 'Lost', stationID: 1 };

			await RecoveryController.updateWeaponStation(req, res);

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					weaponID: expect.any(Number),
					weaponModelID: expect.any(Number),
					orderID: expect.any(Number),
					state: expect.any(String),
					Station: expect.arrayContaining([
						expect.objectContaining({
							stationID: expect.any(Number),
							weaponID: expect.any(Number),
							assigned: 1,
							assignedDate: expect.any(String),
						}),
					]),
				})
			);
		});

		it('should not be able to delete the weapon since it has been assigned to station', async () => {
			req.params = { weaponID: weapon.weaponID };

			await RecoveryController.deleteWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
	});

	describe('recovery station methods', () => {
		it('should get all the recoveries of a station', async () => {
			req.params = { stationID: 1 };

			await RecoveryController.getWeaponStation(req, res);

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(expect.any(Array));
		});
	});

	describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Models.WeaponStation);
			mockErrorMethod(Models.Weapon);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return an error message on sequelize errors for get weapons of a station ', async () => {
			req.body = {};

			await RecoveryController.getWeaponStation(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
		
		it('should return an error message on sequelize errors for update of state of a weapon of a station ', async () => {
			req.body = {state:'Lost'};

			await RecoveryController.updateWeaponStation(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
		
		it('should return an error message updating other properties without state of a weapon of a station ', async () => {
			req.body = {};

			await RecoveryController.updateWeaponStation(req, res);

			expect(res.status).toHaveBeenCalledWith(401);
		});

		it('should return 400 state on get all weapons for errors', async () => {
			req.body = {};

			await RecoveryController.getWeapons(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
		
		it('should return 400 state on get weapon for errors', async () => {
			req.body = {};

			await RecoveryController.getWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on create for errors', async () => {
			req.body = {};

			await RecoveryController.createWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on update for errors', async () => {
			req.body = {};

			await RecoveryController.updateWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

	});
});
