require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateWeaponModel = require('../../../validator/weaponModel.validator');
const {createWeaponModel} = require('../../helpers/factory')

let server;
let weaponModel;

describe('weapon model validator', () => {
	beforeAll(async() => {
		server = await require('../../../server');
        weaponModel = createWeaponModel();
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

	it('should validate a weapon model',  () => {
        req.body = weaponModel
		validateWeaponModel(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(0)


	});

	it('should return an error on validate weapon model',  () => {
        req.body = {...weaponModel, name:1,weaponModelID:'ab'}
		
        validateWeaponModel(req,res,next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(400)


	});


	
});
