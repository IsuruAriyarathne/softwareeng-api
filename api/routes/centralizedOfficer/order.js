const express = require('express');
const OrderController = require('../../controlller/order.controller')
const validateOrder = require('../../validator/order.validator');
const router = express.Router();

/**
 * @description get basic order details
 */
router.get('/',	OrderController.getOrders);

/**
 * @description get order details weapon models and ammunition types ordered with quantity and price.
 */
router.get('/:orderID', OrderController.getOrder);

/**
 * @description get order details weapon models and ammunition types ordered with quantity and price.
 */
router.put('/:orderID', validateOrder, OrderController.updateOrder);

router.post('/', validateOrder, OrderController.createOrder);

/**
 * @description complete the order create entries in weapon table and ammunition batch table
 */
router.get('/:orderID/complete', OrderController.completeOrder);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
