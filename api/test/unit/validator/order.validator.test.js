require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateOrder = require('../../../validator/order.validator');
const {createOrder} = require('../../helpers/factory')
let server;
let order;
describe('order validator', () => {
	beforeAll(async() => {
		server = await require('../../../server');
        order = createOrder();
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

	it('should validate the order',  () => {
        req.body = order
		validateOrder(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(0)


	});

	it('should not validate the order',  () => {
        req.body = {...order,date:1234,supplierID:"0"}
		
        validateOrder(req,res,next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(400)


	});


	
});
