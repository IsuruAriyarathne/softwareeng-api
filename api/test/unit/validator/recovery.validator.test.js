require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateRecovery = require('../../../validator/recovery.validator');
const {createRecovery} = require('../../helpers/factory')
let server;
let recovery;
describe('recovery validator', () => {
	beforeAll(async() => {
		server = await require('../../../server');
        recovery = createRecovery();
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

	it('should validate the recovery',  () => {
        req.body = recovery
		validateRecovery(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(0)


	});

	it('should not validate the recovery',  () => {
        req.body = {...recovery,date:1234,stationID:"0"}
		
        validateRecovery(req,res,next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(400)


	});


	
});
