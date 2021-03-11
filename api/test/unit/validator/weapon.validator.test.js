require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateWeapon = require('../../../validator/weapon.validator');
const {createWeapon} = require('../../helpers/factory')

let server;
let weapon;

describe('weapon validator', () => {
	beforeAll(async() => {
		server = await require('../../../server');
        weapon = createWeapon();
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

	it('should validate a weapon',  () => {
        req.body = weapon
		validateWeapon(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(0)


	});

	it('should return an error on validate weapon',  () => {
        req.body = {...weapon, state:'cdf',weaponModelID:'ab'}
		
        validateWeapon(req,res,next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(400)


	});


	
});
