const express = require("express");
const WeaponController= require("../../controlller/weapon.controller");

const router = express.Router();

router.get('/', WeaponController.getWeapons )

router.get('/:weaponID', WeaponController.getWeapon);

router.put('/:weaponID', WeaponController.updateWeapon )

router.post('/', WeaponController.createWeapon)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;