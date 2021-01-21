const express = require("express");
const AmmunitionBatch = require('../../model/ammunitionBatch.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 
const AmmunitionController = require('../../controlller/ammunition.controller')
const router = express.Router();

router.get('/', AmmunitionController.getAmmunitionBatches)

router.get('/:ammoModelId/:orderID', AmmunitionController.getAmmunitionBatch );

router.put('/:ammoModelId', AmmunitionController.updateAmmunitionBatch )

router.post('/', AmmunitionController.createAmmunitionBatch)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;