const express = require("express");
const RequestController = require('../../controlller/request.controller');
const validateRequest = require('../../validator/request.validator');

const router = express.Router();

/**
 * @description get requests made by the stations
 */
router.get('/:stationID', RequestController.getRequestsStation)


/**
 * @description get the ammunition models and weapon models in the request
 */
router.get('/:stationID/:requestID',RequestController.getRequest);


/**
 * @description update the basic details and ammunition models and weapon models in the request
 */
router.put('/:requestID',validateRequest,RequestController.updateRequest)


/**
 * @description create new request with ammunition models and weapon models.
 */
router.post('/',validateRequest,RequestController.createRequest);

/**
 * @description delete request.
 */
router.delete('/:requestID',validateRequest,RequestController.deleteRequest);


module.exports = router;