const OrderController = require('../../../controlller/order.controller');
const { createOrder, createSupplier } = require('../../helpers/factory');
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

		beforeAll(async() => {
			supplier = await writeToDB(Models.Supplier,createSupplier());
            order = await writeToDB(Models.Order, createOrder(supplier.supplierID));
		})
		afterAll(async() => {
			await destroyFromDB(Models.Supplier,supplier,'supplierID');
            await destroyFromDB(Models.Order,order,'orderID')
		})

		it('should return orders given by ID', async () => {
		    req.params = { orderId: order.orderID };

		 	await StationController.getStation(req, res);

		// 	expect(res.status).toHaveBeenCalledWith(200);
		// 	expect(res.send).toHaveBeenCalledWith(station);
		// });

		it('should return all orders', async () => {
			await OrderController.getOrders(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			// expect(res.send).toHaveBeenCalledWith(stations);
		});

		// it('should delete a station', async () => {
		// 	req.params = { stationId: station.stationID };

		// 	await StationController.deleteStation(req, res);

		// 	expect(res.status).toHaveBeenCalledWith(200);
		// 	expect(res.send).toHaveBeenCalledWith('Succesfully station deleted');
		// });
	});

	// describe('create a station', () => {
	// 	beforeAll(() => {
	// 		station = createStation()
	// 	})
	// 	afterAll(async() => {
	// 		await destroyFromDB(Models.Station,station,'stationID')
	// 	})

	// 	it('should create a station', async () => {
	// 		req.body = station;
	// 		station = await StationController.createStation(req, res);
	
	// 		expect(res.status).toHaveBeenCalledWith(200);
	// 	});
	// })
	
});
