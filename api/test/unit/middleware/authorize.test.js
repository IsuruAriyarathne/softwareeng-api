const { authorize } = require('../../../middleware/authorize');
const {USER_TYPES} = require('../../../utils/constants')

let server;
describe('authorization', () => {
	beforeAll(() => {
		server = require('../../../server');
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

	it('should unauthorized if req doesnt have a user property',  () => {

		authorize(USER_TYPES)(req,res,next)

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.send).toHaveBeenCalledWith("You are unauthorized");

	});

	it('should unauthorized if req user role doesnt match authorize role',  () => {
		req.user= {role: USER_TYPES[0]}

		authorize(USER_TYPES[1])(req, res,next);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.send).toHaveBeenCalledWith("You are unauthorized");

	});

	it('should authorize request if user types match',  () => {
		req.user= {role: USER_TYPES[1]}

        authorize(USER_TYPES[1])(req,res,next);

        expect(next).toHaveBeenCalledTimes(1)

	});

	
});
