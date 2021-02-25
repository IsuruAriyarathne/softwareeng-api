const StationController = require('../../../controlller/station.controller');
const { createStation } = require('../../helpers/factory')
let server;
let stations;
describe('station controller', () => {
	
	beforeAll(async () => {
		server = await require('../../../server');
	});

	afterAll(async() => {
	    await Station.destroy({where:{stationID:stations.map(item => item.stationID)}})
	    server.close()
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};

	describe('get stations', () => {
		
		beforeEach(async() => {
			stations = await createStation(10);
		})
		
		afterAll(async() => {
			await Station.destroy({where:{stationID:stations.map(item => item.stationID)}})
			server.close()
		});

		it('should return all stations', async () => {
			await StationController.getStations(req, res);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(stations);
		});
	});

	describe('create a station', () => {
		req.body = createStation()[0];
		it('should create a station', async () => {
			await StationController.createStation(req, res);
			expect(res.status).toHaveBeenCalledWith(200);
		});
	});
	
	describe('create a station', () => {
		req.body = createStation()[0];
		it('should create a station', async () => {
			await StationController.createStation(req, res);
			expect(res.status).toHaveBeenCalledWith(200);
		});
	});

});
