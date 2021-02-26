const StationController = require('../../../controlller/station.controller');
const { createStation } = require('../../helpers/factory');
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');

let server;

describe('station controller', () => {
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
	let station;

	describe('get and delete stations', () => {
		beforeAll(async() => {
			station = await writeToDB(Models.Station,createStation())
		})
		afterAll(async() => {
			await destroyFromDB(Models.Station,station,'stationID')
		})

		it('should return station given by ID', async () => {
			req.params = { stationId: station.stationID };

			await StationController.getStation(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(station);
		});
		
		it('should update station given by ID', async () => {
			req.body = {...createStation(), stationID:station.stationID}
			req.params = { stationId: station.stationID };

			await StationController.updateStation(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(req.body);
		});

		it('should return all stations', async () => {
			await StationController.getStations(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			// expect(res.send).toHaveBeenCalledWith(stations);
			// expect(users).toEqual(
			// 	expect.arrayContaining([
			// 	  expect.objectContaining({id: 1}),
			// 	  expect.objectContaining({id: 2})
			// 	])
			//   );
			expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({
				stationID: expect.any(Number),
				stationName: expect.any(String),
				location: expect.any(String),
				type: expect.any(String),
				contactNo: expect.any(String)
			  })],))
		});

		it('should delete a station', async () => {
			req.params = { stationId: station.stationID };

			await StationController.deleteStation(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully station deleted');
		});
	});

	describe('create a station', () => {
		beforeAll(() => {
			station = createStation()
		})
		afterAll(async() => {
			await destroyFromDB(Models.Station,station,'stationID')
		})

		it('should create a station', async () => {
			req.body = station;
			station = await StationController.createStation(req, res);
	
			expect(res.status).toHaveBeenCalledWith(200);
		});
	})
	
});
