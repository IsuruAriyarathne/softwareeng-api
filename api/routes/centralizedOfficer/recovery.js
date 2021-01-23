const express = require("express");
const RecoveryController = require('../../controlller/recovery.controller');
const validateRecovery = require('../../validator/centralizedOfficer/recovery.validator');

const router = express.Router();

/**
 * @description get all the recoveries 
 */
router.get('/', RecoveryController.getRecoveries)

/**
 * @description get the recovery with the ammunition type and weapon model recovered and their amount
 */
router.get('/:recoveryID', RecoveryController.getRecovery);

/**
 * @description update recovery with basic info and the ammunition type and weapon model recovered and their amount
 */
router.put('/:recoveryID', validateRecovery, RecoveryController.updateRecovery)

/**
 * @description create recovery with the ammunition type and weapon model recovered and their amount
 */
router.post('/', validateRecovery, RecoveryController.createRecovery);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

// router.delete('/:recoveryID', )

module.exports = router;