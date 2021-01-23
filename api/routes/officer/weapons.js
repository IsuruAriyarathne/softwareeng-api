const express = require('express');
const router = express.Router();
const WeaponController = require('../../controlller/weapon.controller')
const validateWeapon = require('../../validator/officer/weapon.validator');

router.get('/:stationID', WeaponController.getWeaponStation);


router.put('/:weaponID', validateWeapon, WeaponController.updateWeaponStation);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
