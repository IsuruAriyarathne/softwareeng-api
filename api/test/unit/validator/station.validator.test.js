require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateStation = require('../../../validator/station.validator');
const {createStation} = require('../../helpers/factory')
let server;
let station;
describe('station validator', () => {
	beforeAll(() => {
		server = require('../../../server');
        station = createStation();
	});

	afterAll(() => {
		server.close();
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};
    const next = jest.fn();

	it('should validate the station',  () => {
        req.body = station
		validateStation(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(0)


	});

	it('should validate the station',  () => {
        req.body = {...station, type:'abc',contactNo:'1234', stationName:1}
		
        validateStation(req,res,next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(400)


	});


	
});
