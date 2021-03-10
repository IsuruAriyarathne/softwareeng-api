const express = require('express');
const router = express.Router();
const WeaponController = require('../../controlller/weapon.controller')
const validateWeapon = require('../../validator/weapon.validator');

/**
 * @description get weapons of the station
 */
router.get('/:stationID', WeaponController.getWeaponStation);

/**
 * @description update the weapon state
 */
router.put('/:weaponID', validateWeapon, WeaponController.updateWeaponStation);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
