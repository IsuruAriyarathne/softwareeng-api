const express = require("express");
const AmmunitionController = require('../../controlller/ammunition.controller')
const router = express.Router();


router.get('/', AmmunitionController.getAmmunitionBatches);

router.get('/:ammoModelID/:orderID', AmmunitionController.getAmmunitionBatch );

router.put('/:ammoModelID', AmmunitionController.updateAmmunitionBatch )

router.post('/', AmmunitionController.createAmmunitionBatch)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;