const express = require("express");
const RequestController = require('../../controlller/request.controller');

const router = express.Router();

/**
 * @description get requests made by the stations
 */
router.get('/:stationID', RequestController.getRequestsStation)


/**
 * @description get the ammunition models and weapon models in the request
 */
router.get('/:stationID/:requestID',RequestController.getRequestStation);


/**
 * @description update the basic details and ammunition models and weapon models in the request
 */
router.put('/:requestID', RequestController.updateRequest)


/**
 * @description create new request with ammunition models and weapon models.
 */
router.post('/', RequestController.createRequest);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

// router.delete('/:recoveryID', )

module.exports = router;