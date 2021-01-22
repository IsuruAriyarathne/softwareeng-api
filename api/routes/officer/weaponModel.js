const express = require('express');
const WeaponModelController = require('../../controlller/weaponModel.controller');
const router = express.Router();

router.get('/', WeaponModelController.getWeaponModels);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});
module.exports = router;
