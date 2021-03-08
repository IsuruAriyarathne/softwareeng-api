const UserController = require('../../../controlller/user.controller'); // 1 done StationController > UserController
const { createUser, createStation } = require('../../helpers/factory'); // 2
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const mailer = require('../../../services/emailSender');
const { mockErrorMethod } = require('../../helpers/exceptionThrow');

let server;
let station;

describe('user controller', () => {
	beforeAll(async () => {
		server = require('../../../server');
		station = await writeToDB(Models.Station, createStation());
		mailer.sendMail = () => {
			return true;
		};
	});

	afterAll(async () => {
		await destroyFromDB(Models.Station, station, 'stationID');
		jest.clearAllMocks();
		server.close();
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};

	let user;
	let station;

	describe('create a user', () => {
		beforeAll(() => {
			user = createUser(station);
		});
		afterAll(async () => {
			await destroyFromDB(Models.User, user, 'officerID');
		});

		it('should create a user', async () => {
			req.body = user;
			req.body.stationName = station.stationName;

			await UserController.createUser(req, res);
			expect(res.status).toHaveBeenCalledWith(200);

			user.officerID = res.send.mock.calls[0][0].officerID;
			expect.objectContaining({
				officerID: expect.any(Number),
				name: req.body.name,
				email: req.body.email,
				role: req.body.role,
				stationID: req.body.stationID,
			});
		});
	});

	describe('get and delete users', () => {
		beforeAll(async () => {
			station = await writeToDB(Models.Station, createStation());
			user = await writeToDB(Models.User, createUser(station));
		});

		afterAll(async () => {
			await destroyFromDB(Models.User, user, 'officerID');
			await destroyFromDB(Models.Station, user, 'stationID');
		});

		it('should return users given by ID', async () => {
			req.params = { userId: user.officerID };

			await UserController.getUser(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(user);
		});

		it('should return all users', async () => {
			await UserController.getUsers(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					officerID: expect.any(Number),
					name: expect.any(String),
					email: expect.any(String),
					role: expect.any(String),
					stationID: expect.any(Number),
				})
			);
		});

		it('should update a user', async () => {
			req.params = { userId: user.officerID };
			req.body = { ...createUser(), officerID: user.officerID, stationName: station.stationName };

			await UserController.updateUser(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					officerID: expect.any(Number),
					name: expect.any(String),
					email: expect.any(String),
					role: expect.any(String),
					stationID: expect.any(Number),
					stationName: expect.any(String),
					location: expect.any(String),
					type: expect.any(String),
					contactNo: expect.any(String),
				})
			);
		});

		it('should change a users password when passwords match', async () => {
			req.params = { userId: user.officerID };
			req.body = { newPassword: 'abc', confirmNewPassword: 'abc' };

			await UserController.changePassword(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Password succesfully changed');
		});

		it('should send an error when new passwords dont match', async () => {
			req.params = { userId: user.officerID };
			req.body = { newPassword: 'abc', confirmNewPassword: 'abcd' };

			await UserController.changePassword(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.send).toHaveBeenCalledWith('Passwords dont match');
		});

		it('should delete a user', async () => {
			req.params = { userId: user.officerID };

			await UserController.deleteUser(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully user deleted');
		});
	});

	describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Models.User);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return an error message on sequelize errors for get user', async () => {
			req.body = {};

			await UserController.getUser(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get all users for errors', async () => {
			req.body = {};

			await UserController.getUsers(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on create for errors', async () => {
			req.body = {};

			await UserController.createUser(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on update for errors', async () => {
			req.body = {};

			await UserController.updateUser(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete user details for errors', async () => {
			req.body = {};

			await UserController.deleteUser(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on change password of user for errors', async () => {
			req.body = { newPassword: 'abc', confirmNewPassword: 'abc' };

			await UserController.changePassword(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
	});
});
