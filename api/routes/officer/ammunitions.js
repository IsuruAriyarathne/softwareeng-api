const express = require('express');
const AmmunitionController = require('../../controlller/ammunition.controller');
const router = express.Router();

router.get('/:stationID', AmmunitionController.getAmmunitionStation);

router.put('/:ammoModelID', AmmunitionController.updateAmmunitionStation);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
