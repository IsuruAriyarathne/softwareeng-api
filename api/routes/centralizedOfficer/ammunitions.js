const express = require("express");
const AmmunitionController = require('../../controlller/ammunition.controller')
const validateAmmunition = require('../../validator/centralizedOfficer/ammunition.validator');
const router = express.Router();

/**
 * @description get the ammunition batches with order information
 */
router.get('/', AmmunitionController.getAmmunitionBatches);


/**
 * @description get the ammunition batches with allocated stations
 */
router.get('/:ammoModelID/:orderID', AmmunitionController.getAmmunitionBatch );


/**
 * @description update the ammunition batches with order information
 */
router.put('/:ammoModelID/:orderID', validateAmmunition, AmmunitionController.updateAmmunitionBatch )

/**
 * @description create the ammunition batches 
 */
router.post('/', validateAmmunition, AmmunitionController.createAmmunitionBatch)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;