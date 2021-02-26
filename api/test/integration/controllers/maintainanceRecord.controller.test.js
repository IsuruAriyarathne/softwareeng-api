const MaintainanceRecordController = require('../../../controlller/maintainanceRecords.controller');
const MaintainanceRecord = require('../../../model/maintainanceRecord.model');
const { converter } = require('../../../utils/objectConverter');
const { createMaintainanceRecord } = require('../../helpers/factory')

let server;
let maintainanceRecords;
describe('maintainanceRecord controller', () => {
	
	beforeAll(async () => {
		server = require('../../../server');
		maintainanceRecords = createMaintainanceRecord(10);
		maintainanceRecords = await MaintainanceRecord.bulkCreate(maintainanceRecords);
		maintainanceRecords = maintainanceRecords.map(item => converter(item.dataValues));
	});

	afterAll(async () => {
		await MaintainanceRecord.destroy({ where: {} });
		server.close();
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};

	
	// it('should return stations given by ID', async () => {
	// 	req.params = {stationId: stations[0].stationID}

	// 	await StationController.getStation(req, res);
		
	// 	expect(res.status).toHaveBeenCalledWith(200);
	// 	expect(res.send).toHaveBeenCalledWith(stations[0]);
	// });
	
	it('should return all maintainance records', async () => {
		await MaintainanceRecordController.getMaintainanceRecords(req, res);
		
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith(maintainanceRecords);
	});

});
