const CompanyController = require('../../../controlller/company.controller');
const { createCompany } = require('../../helpers/factory');
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const {mockErrorMethod} = require('../../helpers/exceptionThrow')

let server;

describe('company controller', () => {
	beforeAll(async () => {
		server = require('../../../server');
	});

	afterAll(async () => {
		server.close();
	});

	let req = {};

	const res = {
		send: jest.fn(() => res),
		status: jest.fn(() => res),
	};

	let company;

	describe('get and delete company', () => {
		beforeAll(async () => {
			company = await writeToDB(Models.Supplier, createCompany());
		});
		afterAll(async () => {
			await destroyFromDB(Models.Supplier, company, 'supplierID');
		});

		it('should return company given by ID', async () => {
			req.params = { supplierID: 1 };

			await CompanyController.getCompany(req, res);

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					SupplyAmmunition: expect.arrayContaining([
						expect.objectContaining({
							ammoModelID: expect.any(Number),
							supplierID: 1,
							name: expect.any(String),
							description: expect.any(String),
						}),
					]),
					SupplyWeapon: expect.arrayContaining([
						expect.objectContaining({
							weaponModelID: expect.any(Number),
							supplierID: 1,
							name: expect.any(String),
							description: expect.any(String),
						}),
					]),
				})
			);
		});

		it('should update company given by ID', async () => {
			req.body = { ...createCompany(), supplierID: company.supplierID };
			req.params = { supplierID: company.supplierID };
			req.body.SupplyAmmunition = [{ supplierID: company.supplierID, ammoModelID: 1 }];
			req.body.SupplyWeapon = [{ supplierID: company.supplierID, weaponModelID: 1 }];

			await CompanyController.updateCompany(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					supplierID: expect.any(Number),
					name: expect.any(String),
					description: expect.any(String),
					address: expect.any(String),
					contactNumber: expect.any(String),
				})
			);
		});

		it('should delete a weapon model supplied by company', async () => {
			req.params = { supplierID: company.supplierID, weaponModelID:1 };

			await CompanyController.deleteWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully weapon model  deleted');
		});

		it('should delete a ammuition type supplied by company', async () => {
			req.params = { supplierID: company.supplierID, ammoModelID:1 };
			
			await CompanyController.deleteAmmunitionTypes(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully ammunition type  deleted');
			
		});

		it('should return all companies', async () => {
			await CompanyController.getCompanies(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						supplierID: expect.any(Number),
						name: expect.any(String),
						description: expect.any(String),
						address: expect.any(String),
						contactNumber: expect.any(String),
					}),
				])
			);
		});

		it('should delete a company', async () => {
			req.params = { supplierID: company.supplierID };

			await CompanyController.deleteCompany(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully supplier  deleted');
		});
	});

	describe('create a company', () => {
		beforeAll(() => {
			company = createCompany();
		});
		afterAll(async () => {
			await destroyFromDB(Models.Supplier, company, 'supplierID');
		});

		it('should create a company', async () => {
			req.body = company;
			await CompanyController.createCompany(req, res);
			company.supplierID = res.send.mock.calls[4][0].supplierID;
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					supplierID: expect.any(Number),
					name: company.name,
					description: company.description,
					address: company.address,
					contactNumber: company.contactNumber,
				})
			);
		});
	});

    describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Models.Supplier);
			mockErrorMethod(Models.SupplyAmmunition);
			mockErrorMethod(Models.SupplyWeapon);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return an error message on sequelize errors for get company', async () => {
			req.body = {};

			await CompanyController.getCompany(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get all comapies for errors', async () => {
			req.body = {};

			await CompanyController.getCompanies(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on create for errors', async () => {
			req.body = {};

			await CompanyController.createCompany(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on update for errors', async () => {
			req.body = {};

			await CompanyController.updateCompany(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete company details for errors', async () => {
			req.body = {};

			await CompanyController.deleteCompany(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete ammunition types supplied by company errors', async () => {
			req.body = {};

			await CompanyController.deleteAmmunitionTypes(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete weapon models supplied by company errors', async () => {
			req.body = {};

			await CompanyController.deleteWeaponModel(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
	});
});
