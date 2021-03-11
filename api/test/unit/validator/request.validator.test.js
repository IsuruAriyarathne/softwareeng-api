require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateRequest = require('../../../validator/request.validator');
const {createRequest} = require('../../helpers/factory')
let server;
let request;
describe('request validator', () => {
	beforeAll(async() => {
		server = await require('../../../server');
        request = createRequest();
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

	it('should validate the request',  () => {
        req.body = request
		validateRequest(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(0)


	});

	it('shouldnot validate the request',  () => {
        req.body = {...request,date:1234,stationID:0}
		
        validateRequest(req,res,next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(400)


	});


	
});
