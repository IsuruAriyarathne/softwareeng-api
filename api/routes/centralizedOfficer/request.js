const express = require("express");
const RequestController = require('../../controlller/request.controller');
const validateRequest = require('../../validator/request.validator');

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
router.put('/:requestID', validateRequest, RequestController.updateRequest)


module.exports = router;