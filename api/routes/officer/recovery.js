const express = require("express");
const RecoveryController = require('../../controlller/recovery.controller');
const router = express.Router();

router.get('/:stationID', RecoveryController.getRecoveriesStation);

router.get('/:stationID/:recoveryID', RecoveryController.getRecoveryStation);

router.put('/:recoveryID', RecoveryController.updateRecovery )

//NOT WORKING
router.post('/', RecoveryController.createRecovery )

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});


module.exports = router;