require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateAmmoModel = require('../../../validator/ammoModel.validator');
const {createAmmoModel} = require('../../helpers/factory')

let server;
let ammoModel;

describe('ammoModel validator', () => {
	beforeAll(async() => {
		server = await require('../../../server');
        ammoModel = createAmmoModel();
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

	it('should validate a ammoModel',  () => {
        req.body = ammoModel
		validateAmmoModel(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(0)


	});

	it('should return an error on validate ammoModel',  () => {
        req.body = {...ammoModel, name:1234,ammoModelID:'1'}
		
        validateAmmoModel(req,res,next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(400)


	});


	
});
