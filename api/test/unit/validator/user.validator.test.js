require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateUser = require('../../../validator/user.validator');
const {createUser} = require('../../helpers/factory')

let server;
let user;

describe('user validator', () => {
	beforeAll(async() => {
		server = await require('../../../server');
        user = createUser();
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

	it('should validate a user',  () => {
        req.body = user
		validateUser(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(0)


	});

	it('should return an error on validate user',  () => {
        req.body = {...user, name:1,officerID:'ab'}
		
        validateUser(req,res,next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(400)


	});


	
});
