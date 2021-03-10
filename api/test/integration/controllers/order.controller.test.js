const OrderController = require('../../../controlller/order.controller');
const { createOrder, createAmmoOrder, createWeaponOrder } = require('../../helpers/factory');
const Models = require('../../../model');
const { writeToDB, destroyFromDB } = require('../../helpers/dbHelper');
const {mockErrorMethod} =require('../../helpers/exceptionThrow')
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
	let weaponOrder;
	let ammoOrder;

	describe('create order', () => {
		beforeAll(() => {
			order = createOrder();
			ammoOrder = createAmmoOrder();
			weaponOrder = createWeaponOrder();
		});

		afterAll(async () => {
			await destroyFromDB(Models.AmmunitionBatch, {order: order.orderID}, ['orderID'])
			await destroyFromDB(Models.Weapon, {order: order.orderID}, ['orderID'])
			await destroyFromDB(Models.AmmunitionOrder, ammoOrder, ['ammoModelID', 'orderID']);
			await destroyFromDB(Models.WeaponOrder, weaponOrder, ['orderID', 'weaponModelID']);
			await destroyFromDB(Models.Order, order, 'orderID');
		});

		it('should create an order', async () => {
			order.WeaponOrder = weaponOrder;
			order.AmmoOrder = ammoOrder;

			req.body = order;

			await OrderController.createOrder(req, res);

			order.orderID = res.send.mock.calls[0][0].orderID;
			weaponOrder[0].orderID = res.send.mock.calls[0][0].orderID;
			ammoOrder[0].orderID = res.send.mock.calls[0][0].orderID;

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
					WeaponOrder: expect.arrayContaining([
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

		
		// it('should complete an order', async() => {
        //     req.params = { orderID: order.orderID };

		// 	await OrderController.completeOrder(req, res);

		// 	expect(res.status).toHaveBeenCalledWith(200);
		// 	expect(res.send).toHaveBeenCalledWith('Order completed')
        // })

		it('shouldnt  delete a order since it has weapons and ammos', async() => {
            req.params = { orderID: order.orderID };

			await OrderController.deleteOrder(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
        })
	});
	describe('get and delete orders', () => {
		beforeAll(async () => {
			order = await writeToDB(Models.Order, createOrder());
		});

		afterAll(async () => {
			await destroyFromDB(Models.Order, order, 'orderID');
		});

		it('should return all orders', async () => {
			await OrderController.getOrders(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						orderID: expect.any(Number),
						supplierID: expect.any(Number),
						date: expect.any(String),
						totalCost: expect.any(Number),
						state: expect.any(String),
						description: expect.any(String),
						name: expect.any(String),
						contactNumber: expect.any(String),
						address: expect.any(String),
					}),
				])
			);
		});

		it('should return the ammunition models and weapon models in an order', async () => {
			req.params = { orderID: 1 };

			await OrderController.getOrder(req, res);

			expect(res.status).toHaveBeenCalledWith(200);

			expect(res.send).toHaveBeenCalledWith(
				expect.objectContaining({
					AmmoOrder: expect.arrayContaining([
						expect.objectContaining({
							ammoModelID: expect.any(Number),
							orderID: expect.any(Number),
							count: expect.any(Number),
							cost: expect.any(Number),
							name: expect.any(String),
							state: expect.any(String),
							description: expect.any(String),
						}),
					]),
					WeaponOrder: expect.arrayContaining([
						expect.objectContaining({
							weaponModelID: expect.any(Number),
							orderID: expect.any(Number),
							count: expect.any(Number),
							cost: expect.any(Number),
							state: expect.any(String),
							name: expect.any(String),
							description: expect.any(String),
						}),
					]),
				})
			);
		});

		it('should update an order', async () => {
			req.params = { orderID: order.orderID };

			req.body = createOrder(1, order.orderID);

			await OrderController.updateOrder(req, res);

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
							name: expect.any(String),
							state: expect.any(String),
							description: expect.any(String),
						}),
					]),
					WeaponOrder: expect.arrayContaining([
						expect.objectContaining({
							weaponModelID: expect.any(Number),
							orderID: expect.any(Number),
							count: expect.any(Number),
							cost: expect.any(Number),
							state: expect.any(String),
							name: expect.any(String),
							description: expect.any(String),
						}),
					]),
				})
			);
		});
		
		it('should delete a order Ammunition', async() => {
            req.params = { orderID: order.orderID, ammoModelID: 1 };

			await OrderController.deleteOrderAmmunition(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully order ammunition deleted')
        })

        it('should delete a order weapon', async() => {
            req.params = { orderID: order.orderID, weaponModelID: 1 };

			await OrderController.deleteOrderWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully order weapon deleted')
        })
        
        it('should delete a order', async() => {
            req.params = { orderID: order.orderID };

			await OrderController.deleteOrder(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith('Succesfully order deleted')
        })
	});
	describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Models.AmmunitionOrder);
			mockErrorMethod(Models.WeaponOrder);
			mockErrorMethod(Models.Order);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return an error message on sequelize errors for get order ', async () => {
			req.body = {};

			await OrderController.getOrder(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on get all orders for errors', async () => {
			req.body = {};

			await OrderController.getOrders(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on create for errors', async () => {
			req.body = {};

			await OrderController.createOrder(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on update for errors', async () => {
			req.body = {};

			await OrderController.updateOrder(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on complete Order', async () => {
			req.body = {};

			await OrderController.completeOrder(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});
		
		it('should return 400 state on delete Order ammuitions', async () => {
			req.body = {};

			await OrderController.deleteOrderAmmunition(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it('should return 400 state on delete Order weapons', async () => {
			req.body = {};

			await OrderController.deleteOrderWeapon(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
		});

	});
});
