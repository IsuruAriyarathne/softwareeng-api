const express = require("express");
const AmmunitionTypeController = require('../../controlller/ammoModel.controller')

const router = express.Router();

/**
 * @description get the ammunition Models
 */
router.get('/', AmmunitionTypeController.getAmmoModels )

/**
 * @description get the weapon models for which the ammunition is used for
 */
router.get('/:ammoModelID', AmmunitionTypeController.getAmmoModel);

/**
 * @description update the ammunition Model. Can add a weapon model for ammunition type.
 */
router.put('/:ammoModelID', AmmunitionTypeController.updateAmmoModel)


/**
 * @description create ammunition model 
 */
router.post('/', AmmunitionTypeController.createAmmoModel )


router.delete('/:ammoModelID',AmmunitionTypeController.deleteAmmoModel )

router.delete('/:ammoModelID/:weaponModelID',AmmunitionTypeController.deleteAmmoModel )

router.all('*', (req, res) => {
	res.status(404).send( "Not found");
  });

module.exports = router;