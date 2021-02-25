const StationController = require('../../../controlller/station.controller');
const { createStation } = require('../../helpers/factory');
const { converter } = require('../../../utils/objectConverter');
const Station = require('../../../model/station.model');

let server;
let stations;
describe('station controller', () => {
	beforeAll(async () => {
		server = require('../../../server');
		stations = createStation(10);
		stations = await Station.bulkCreate(stations);
		stations = stations.map(item => converter(item.dataValues));
	});

	afterAll(async () => {
		await Station.destroy({ where: {} });
		server.close();
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};

	
	it('should return stations given by ID', async () => {
		req.params = {stationId: stations[0].stationID}

		await StationController.getStation(req, res);
		
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith(stations[0]);
	});
	
	it('should return all stations', async () => {
		
		await StationController.getStations(req, res);
		
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith(stations);
	});
	

	it('should create a station', async () => {
		
		req.body = createStation()[0];
		
		let station = await StationController.createStation(req, res);
		stations.push(station);

		expect(res.status).toHaveBeenCalledWith(200);

	});

	it('should delete a station', async () => {

		req.params = { stationId: stations[0].stationID };
		
		await StationController.deleteStation(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith('Succesfully station deleted');
	});
});
