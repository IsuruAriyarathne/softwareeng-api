const RecoveryController = require('../../../controlller/recovery.controller'); // 1 done StationController > UserController
const { createRecovery, createRecoveredAmmo, createRecoveredWeapon } = require('../../helpers/factory'); // 2
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const { mockErrorMethod } = require('../../helpers/exceptionThrow');

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

	let recovery;
	let recoveredAmmo;
	let recoveredWeapons;
	describe('create a recovery', () => {
		beforeAll(() => {
			recovery = createRecovery();
			recoveredAmmo = createRecoveredAmmo();
			recoveredWeapons = createRecoveredWeapon();
		});

		afterAll(async () => {
			await destroyFromDB(Models.RecoveredAmmunition, recoveredAmmo, ['recoveryID', 'ammoModelID']);
			await destroyFromDB(Models.RecoveredWeapon, recoveredWeapons, ['recoveryID', 'weaponModelID']);
			await destroyFromDB(Models.Recovery, recovery, 'recoveryID');
		});

		it('should create a recovery', async () => {
			recovery.RecoveredAmmunitions = recoveredAmmo;
			recovery.RecoveredWeapons = recoveredWeapons;
			req.body = recovery;

			await RecoveryController.createRecovery(req, res);

			recovery.recoveryID = res.send.mock.calls[0][0].recoveryID;
			recoveredAmmo[0].recoveryID = res.send.mock.calls[0][0].recoveryID;
			recoveredWeapons[0].recoveryID = res.send.mock.calls[0][0].recoveryID;

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					recoveryID: expect.any(Number),
					stationID: 1,
					recoveryDate: recovery.recoveryDate,
					description: recovery.description,
					RecoveredAmmunitions: expect.any(Array),
					RecoveredWeapons: expect.any(Array),
				})
			);
		});

        it('should not be able to delete the recovery since it has weapons and ammunitions', async () => {
			req.params = { recoveryID: recovery.recoveryID };

			await RecoveryController.deleteRecovery(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
	});

	describe('get and delete recoverys', () => {
		beforeAll(async () => {
			recovery = await writeToDB(Models.Recovery, createRecovery());
		});

		afterAll(async () => {
			await destroyFromDB(Models.Recovery, recovery, 'recoveryID');
		});

		it('should return the recoveries of a station', async () => {
			req.params = { stationID: 1 };

			await RecoveryController.getRecoveriesStation(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						recoveryID: expect.any(Number),
						stationID: 1,
						recoveryDate: expect.any(String),
						description: expect.any(String),
					}),
				])
			);
		});

		it('should return details about a recovery given recoveryID', async () => {
			req.params = { recoveryID: 1 };
			await RecoveryController.getRecovery(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					RecoveredAmmunitions: expect.arrayContaining([
						expect.objectContaining({
							ammoModelID: expect.any(Number),
							amount: expect.any(Number),
							recoveryID: expect.any(Number),
						}),
					]),
					RecoveredWeapons: expect.arrayContaining([
						expect.objectContaining({
							weaponModelID: expect.any(Number),
							amount: expect.any(Number),
							recoveryID: expect.any(Number),
						}),
					]),
				})
			);
		});

		it('should get all recoveries with station details', async () => {
			await RecoveryController.getRecoveries(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						recoveryID: expect.any(Number),
						recoveryDate: expect.any(String),
						description: expect.any(String),
						stationID: expect.any(Number),
						stationName: expect.any(String),
						location: expect.any(String),
						type: expect.any(String),
						contactNo: expect.any(String),
					}),
				])
			);
		});

		it('should update a recovery', async () => {
			req.params = { recoveryID: recovery.recoveryID };

			req.body = createRecovery(recovery.recoveryID);

			await RecoveryController.updateRecovery(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					recoveryID: expect.any(Number),
					recoveryDate: expect.any(String),
					description: expect.any(String),
					stationID: expect.any(Number),
					RecoveredAmmunitions: expect.any(Array),
					RecoveredWeapons: expect.any(Array),
				})
			);
		});

        it('should delete a recovered Ammunition', async() => {
            req.params = { recoveryID: recovery.recoveryID, ammoModelID: 1 };

			await RecoveryController.deleteRecoveryAmmunition(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Recovery Ammunition succesfully deleted')
        })

        it('should delete a recovered weapon', async() => {
            req.params = { recoveryID: recovery.recoveryID, weaponModelID: 1 };

			await RecoveryController.deleteRecoveryWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Recovery Weapon succesfully deleted')
        })
        
        it('should delete a recovery', async() => {
            req.params = { recoveryID: recovery.recoveryID };

			await RecoveryController.deleteRecovery(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Recovery succesfully deleted')
        })

	});

	describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Models.RecoveredAmmunition);
			mockErrorMethod(Models.RecoveredWeapon);
			mockErrorMethod(Models.Recovery);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return an error message on sequelize errors for get recoveries of a station ', async () => {
			req.body = {};

			await RecoveryController.getRecoveriesStation(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get all recoveries for errors', async () => {
			req.body = {};

			await RecoveryController.getRecoveries(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get recovery for errors', async () => {
			req.body = {};

			await RecoveryController.getRecovery(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on create for errors', async () => {
			req.body = {};

			await RecoveryController.createRecovery(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on update for errors', async () => {
			req.body = {};

			await RecoveryController.updateRecovery(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete recovery ammuitions', async () => {
			req.body = {};

			await RecoveryController.deleteRecoveryAmmunition(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete recovery weapons', async () => {
			req.body = {};

			await RecoveryController.deleteRecoveryWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

	});
});
