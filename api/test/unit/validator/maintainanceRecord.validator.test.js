require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateMaintainanceRecord = require('../../../validator/maintainanceRecord.validator');
const { createMaintainanceRecords } = require('../../helpers/factory');
let server;
let record;
describe('maintainance record validator', () => {
	beforeAll(async() => {
		server = await require('../../../server');
		record = createMaintainanceRecords();
	});

	afterAll(async() => {
		await server.close();
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};
	const next = jest.fn();

	it('should validate the maintainance record', () => {
		req.body = record;
		validateMaintainanceRecord(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledTimes(0);
	});

	it('should not validate the maintainance record', () => {
		req.body = { ...record, date: 1234, amount:'21ed', weaponID: '1' };

		validateMaintainanceRecord(req, res, next);

		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(400);
	});
});
