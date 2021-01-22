const express = require("express");
const RecoveryController = require('../../controlller/recovery.controller');
const router = express.Router();

/**
 * @description get recoveries of the station
 */
router.get('/:stationID', RecoveryController.getRecoveriesStation);

/**
 * @description get the ammunition type and weapon model amounts of recovery
 */
router.get('/:stationID/:recoveryID', RecoveryController.getRecoveryStation);

/**
 * @description update the ammunition type and weapon model amounts of recovery and basic info
 */
router.put('/:recoveryID', RecoveryController.updateRecovery )

/**
 * @description create new recovery
 */
router.post('/', RecoveryController.createRecovery )

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});


module.exports = router;