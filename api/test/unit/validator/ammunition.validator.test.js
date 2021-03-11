require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateAmmunition = require('../../../validator/ammunition.validator');
const {createAmmunitionBatch} = require('../../helpers/factory')

let server;
let ammoBatch;

describe('ammoBatch validator', () => {
	beforeAll(async() => {
		server = await require('../../../server');
        ammoBatch = createAmmunitionBatch();
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

	it('should validate a ammoBatch',  () => {
        req.body = ammoBatch
		validateAmmunition(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(0)


	});

	it('should return an error on validate ammoBatch',  () => {
        req.body = {...ammoBatch, count:"12a",ammoModelID:'1'}
		
        validateAmmunition(req,res,next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(400)


	});


	
});
