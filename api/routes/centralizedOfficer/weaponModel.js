const express = require("express");
const WeaponModelController = require('../../controlller/weaponModel.controller');
const validateWeaponModel = require('../../validator/centralizedOfficer/weaponModel.validator');
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


router.delete('/:weaponModelID/:ammoModelID', WeaponModelController.deleteAmmunitionType)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;