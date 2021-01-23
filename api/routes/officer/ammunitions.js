const express = require('express');
const AmmunitionController = require('../../controlller/ammunition.controller');
const validateAmmunition = require('../../validator/officer/ammunition.validator');
const router = express.Router();

router.get('/:stationID', AmmunitionController.getAmmunitionStation);

router.put('/:ammoModelID', validateAmmunition, AmmunitionController.updateAmmunitionStation);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
