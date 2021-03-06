const express = require("express");
const RecoveryController = require('../../controlller/recovery.controller');
const validateRecovery = require('../../validator/recovery.validator');

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


/**
 * @description delete recovery
 */
router.delete('/:recoveryID', RecoveryController.deleteRecovery);


module.exports = router;