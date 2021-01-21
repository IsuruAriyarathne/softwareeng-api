const express = require('express');
const OrderController = require('../../controlller/order.controller')
const router = express.Router();

router.get('/',	OrderController.getOrders);

router.get('/:supplierID', OrderController.getOrder);

router.put('/:supplierID', OrderController.updateOrder);

router.post('/', OrderController.createOrder);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
