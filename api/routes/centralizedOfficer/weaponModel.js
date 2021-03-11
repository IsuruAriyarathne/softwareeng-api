const express = require("express");
const WeaponModelController = require('../../controlller/weaponModel.controller');
const validateWeaponModel = require('../../validator/weaponModel.validator');
const router = express.Router();

/**
 * @description get the weapon models
 */
router.get('/', WeaponModelController.getWeaponModels )

/**
 * @description get the ammunition types for the weapon model
 */
router.get('/:weaponModelID', WeaponModelController.getWeaponModel);

/**
 * @description update weapon model. can add a macthing ammunition type.
 */
router.put('/:weaponModelID', validateWeaponModel, WeaponModelController.updateWeaponModel);

/**
 * @description add new weapon model
 */
router.post('/', validateWeaponModel, WeaponModelController.createWeaponModel );

/**
 * @description delete weapon Model which are not foreign keys are only deleted
 */
router.delete('/:weaponModelID', WeaponModelController.deleteWeaponModel)

/**
 * @description delete ammunition types of the weapon Model 
 */
router.delete('/:weaponModelID/:ammoModelID', WeaponModelController.deleteAmmunitionType)


module.exports = router;