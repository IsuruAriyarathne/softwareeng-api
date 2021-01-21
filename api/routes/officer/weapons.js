const express = require('express');
const router = express.Router();
const WeaponController = require('../../controlller/weapon.controller')

router.get('/:stationID', WeaponController.getWeaponStation);


router.put('/:weaponID', WeaponController.updateWeaponStation);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
