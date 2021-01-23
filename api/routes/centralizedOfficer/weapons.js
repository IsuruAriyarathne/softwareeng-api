const express = require("express");
const WeaponController= require("../../controlller/weapon.controller");
const validateWeapon = require("../../validator/centralizedOfficer/weapon.validator");

const router = express.Router();

router.get('/', WeaponController.getWeapons )

router.get('/:weaponID', WeaponController.getWeapon);

router.put('/:weaponID', validateWeapon, WeaponController.updateWeapon )

router.post('/', validateWeapon, WeaponController.createWeapon)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;