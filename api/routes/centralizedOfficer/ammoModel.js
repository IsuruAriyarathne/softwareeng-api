const express = require("express");
const AmmunitionTypeController = require('../../controlller/ammoModel.controller')
const validateAmmoModel = require('../../validator/ammoModel.validator');

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
router.put('/:ammoModelID', validateAmmoModel, AmmunitionTypeController.updateAmmoModel)


/**
 * @description create ammunition model 
 */
router.post('/', validateAmmoModel, AmmunitionTypeController.createAmmoModel )

/**
 * @description delete ammunition model 
 */
router.delete('/:ammoModelID',AmmunitionTypeController.deleteAmmoModel )

/**
 * @description delete weapon models of the ammunitions type 
 */
router.delete('/:ammoModelID',AmmunitionTypeController.deleteWeaponAmmunition )


router.all('*', (req, res) => {
	res.status(404).send( "Not found");
  });

module.exports = router;