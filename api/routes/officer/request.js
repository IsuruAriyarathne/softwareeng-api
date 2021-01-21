const express = require("express");
const RequestController = require('../../controlller/request.controller');

const router = express.Router();

router.get('/:stationID', RequestController.getRequestsStation)

router.get('/:stationID/:requestID',RequestController.getRequestStation);

router.put('/:requestID', RequestController.updateRequest)

router.post('/', RequestController.createRequest);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

// router.delete('/:recoveryID', )

module.exports = router;