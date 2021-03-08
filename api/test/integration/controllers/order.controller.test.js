const OrderController = require('../../../controlller/order.controller');
const { createOrder, createAmmoOrder, createWeaponOrder } = require('../../helpers/factory');
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');

let server;

describe('order controller', () => {
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

	let order;

	describe('get and delete orders', () => {
		beforeAll(async () => {
			// order = await writeToDB(Models.Order, createOrder(supplier.supplierID));
		});

		afterAll(async () => {
			// await destroyFromDB(Models.Order, order, 'orderID');
		});

	// 	it('should return all orders', async () => {
	// 		await OrderController.getOrders(req, res);

	// 		expect(res.status).toHaveBeenCalledWith(200);
	// 		expect(res.send).toHaveBeenCalledWith(
	// 			expect.arrayContaining([
	// 				expect.objectContaining({
	// 					orderID: expect.any(Number),
	// 					supplierID: expect.any(Number),
	// 					date: expect.any(String),
	// 					totalCost: expect.any(Number),
	// 					state: expect.any(String),
	// 					description: expect.any(String),
	// 					name: expect.any(String),
	// 					contactNumber: expect.any(String),
	// 					address: expect.any(String),
	// 				}),
	// 			])
	// 		);
	// 	});

	// 	it('should return the ammunition models and weapon models in an order', async () => {
	// 		req.params = { orderID: 1 };

	// 		await OrderController.getOrder(req, res);

	// 		expect(res.status).toHaveBeenCalledWith(200);

	// 		expect(res.send).toHaveBeenCalledWith(
	// 			expect.objectContaining({
	// 				AmmoOrder: expect.arrayContaining([
	// 					expect.objectContaining({
	// 						ammoModelID: expect.any(Number),
	// 						orderID: expect.any(Number),
	// 						count: expect.any(Number),
	// 						cost: expect.any(Number),
	// 						name: expect.any(String),
	// 						state: expect.any(String),
	// 						description: expect.any(String)
	// 					}),
	// 				]),
	// 				WeaponOrder: expect.arrayContaining([
	// 					expect.objectContaining({
	// 						weaponModelID: expect.any(Number),
	// 						orderID: expect.any(Number),
	// 						count: expect.any(Number),
	// 						cost: expect.any(Number),
	// 						state: expect.any(String),
	// 						name: expect.any(String),
	// 						description: expect.any(String),
	// 					}),
	// 				]),
	// 			})
	// 		);
	// 	});
	});

	describe('create order', () => {
		beforeAll(() => {
			order = createOrder();
		});

		it('should create an order', async () => {
			order.WeaponOrder = createWeaponOrder();
			order.AmmoOrder = createAmmoOrder();

			req.body = order;
			await OrderController.createOrder(req, res);

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					orderID: expect.any(Number),
					supplierID: expect.any(Number),
					date: expect.any(String),
					totalCost: expect.any(Number),
					state: expect.any(String),
					description: expect.any(String),
					AmmoOrder: expect.arrayContaining([
						expect.objectContaining({
							ammoModelID: expect.any(Number),
							orderID: expect.any(Number),
							count: expect.any(Number),
							cost: expect.any(Number),
							state: expect.any(String),
							description: expect.any(String),
						}),
					]),
					weaponOrder: expect.arrayContaining([
						expect.objectContaining({
							weaponModelID: expect.any(Number),
							orderID: expect.any(Number),
							count: expect.any(Number),
							cost: expect.any(Number),
							state: expect.any(String),
							description: expect.any(String),
						}),
					]),
				})
			);
		});
	});
});
