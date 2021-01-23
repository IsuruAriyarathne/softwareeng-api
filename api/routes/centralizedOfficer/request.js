const express = require("express");
const RequestController = require('../../controlller/request.controller');

const router = express.Router();

/**
 * @description get all requests
 */
router.get('/', RequestController.getRequests)

/**
 * @description get ammunition models and weapon models and their requested amount in the request
 */
router.get('/:requestID',RequestController.getRequest);

/**
 * @description update ammunition models and weapon models and their requested amount and basic details of the request
 */
router.put('/:requestID', RequestController.updateRequest)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

// router.delete('/:recoveryID', )

module.exports = router;