require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const validateCompanies = require('../../../validator/companies.validator');
const {createCompany} = require('../../helpers/factory')

let server;
let company;

describe('company validator', () => {
	beforeAll(async() => {
		server = await require('../../../server');
        company = createCompany();
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

	it('should validate a company',  () => {
        req.body = company
		validateCompanies(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledTimes(0)


	});

	it('should return an error on validate company',  () => {
        req.body = {...company, name:1234,contactNumber:'ab'}
		
        validateCompanies(req,res,next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(400)


	});


	
});
