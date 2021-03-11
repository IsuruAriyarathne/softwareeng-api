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

/**
 * @description delete the order
 */
router.delete('/:orderID', OrderController.deleteOrder);

/**
 * @description delete the order weapon model 
 */
router.delete('/weapon/:orderID/:weaponModelID', OrderController.deleteOrderWeapon);

/**
 * @description delete the order ammunition type
 */
router.delete('/ammo/:orderID/:ammoModelID', OrderController.deleteOrderAmmunition);


module.exports = router;
