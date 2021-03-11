const express = require('express');
const AmmunitionController = require('../../controlller/ammunition.controller');
const validateAmmunition = require('../../validator/ammunition.validator');
const router = express.Router();

/**
 * @description get ammunitions of the station
 */
router.get('/:stationID', AmmunitionController.getAmmunitionStation);

/**
 * @description update the remaining of the station
 */
router.put('/:ammoModelID', validateAmmunition, AmmunitionController.updateAmmunitionStation);


module.exports = router;
