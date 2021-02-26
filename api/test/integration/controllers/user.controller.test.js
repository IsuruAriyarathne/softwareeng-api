const UserController = require('../../../controlller/user.controller');  // 1 done StationController > UserController
const { createUser } = require('../../helpers/factory') // 2
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const { createStation } = require('../../../controlller/station.controller');
const {sendMail} = require('../../../services/emailSender');
let server;
let station;

describe('user controller', () => { // 3 done
	
	beforeAll(async () => {
		server = require('../../../server');
		station = await writeToDB(Models.Station,createStation())
	});

	afterAll(async() => {
	    server.close()
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};
	let user;
	describe('get and delete users', () => {  // 5 done
		
		beforeEach(async() => {
			user = await writeToDB(Models.User,createUser(station))  // 6 half done
		})
		
		afterAll(async() => {
			await destroyFromDB(Models.User,user,'officerID') // 7 done
			await destroyFromDB(Models.Station,station,'stationID') // 7 done
		});

		it('should return users given by ID', async () => {
			req.params = { userId: user.officerID };

			await UserController.getUser(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(user);
		});		

		it('should return all users', async () => {
			await UserController.getUsers(req, res);  // 1
			expect(res.status).toHaveBeenCalledWith(200);
		});

		it('should delete a user', async () => {
			req.params = { userId: user.officerID };

			await UserController.deleteUser(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully user deleted');
		});
	});

	describe('create a user', () => {
		// beforeAll(())
		req.body = createUser();

		it('should create a user', async () => {
			// let sendMail = jest.fn()
			await UserController.createUser(req, res);  // 1
			expect(res.status).toHaveBeenCalledWith(200);
		});
	});
	
});
