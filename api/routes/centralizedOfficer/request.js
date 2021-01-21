const express = require("express");
const RequestController = require('../../controlller/request.controller');

const router = express.Router();

router.get('/', RequestController.getRequests)

router.get('/:requestID',RequestController.getRequest);

router.put('/:requestID', RequestController.updateRequest)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

// router.delete('/:recoveryID', )

module.exports = router;