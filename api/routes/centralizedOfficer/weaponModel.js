const express = require("express");
const WeaponModelController = require('../../controlller/weaponModel.controller');
const router = express.Router();

router.get('/', WeaponModelController.getWeaponModels )

router.get('/:weaponModelID', WeaponModelController.getWeaponModel);

router.put('/:weaponModelID', WeaponModelController.updateWeaponModel);

router.post('/', WeaponModelController.createWeaponModel );

router.delete('/:weaponModelID/:ammoModelID', WeaponModelController.deleteAmmunitionType)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;