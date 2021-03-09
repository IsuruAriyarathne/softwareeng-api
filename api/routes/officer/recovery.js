const express = require("express");
const RecoveryController = require('../../controlller/recovery.controller');
const validateRecovery = require('../../validator/officer/recovery.validator');
const router = express.Router();

/**
 * @description get recoveries of the station
 */
router.get('/:stationID', RecoveryController.getRecoveriesStation);

/**
 * @description get the ammunition type and weapon model amounts of recovery
 */
router.get('/:recoveryID', RecoveryController.getRecovery);

/**
 * @description update the ammunition type and weapon model amounts of recovery and basic info
 */
router.put('/:recoveryID', validateRecovery, RecoveryController.updateRecovery )

/**
 * @description create new recovery
 */
router.post('/', validateRecovery, RecoveryController.createRecovery )

/**
 * @description create new recovery
 */
router.post('/', RecoveryController.createRecovery )

/**
 * @description delete recovery
 */
router.delete('/:recoveryID', RecoveryController.deleteRecovery )

/**
 * @description delete recovery weapon
 */
router.delete('/weaponModel/:recoveryID/:weaponModelID', RecoveryController.deleteRecoveryWeapon )

/**
 * @description delete recovery ammunition
 */
router.delete('/ammoModel/:recoveryID/:ammoModelID', RecoveryController.deleteRecoveryAmmunition )

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});


module.exports = router;