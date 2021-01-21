const express = require("express");
const AmmunitionTypeController = require('../../controlller/ammoModel.controller')

const router = express.Router();

router.get('/', AmmunitionTypeController.getAmmoModels )

router.get('/:ammoModelId', AmmunitionTypeController.getAmmoModel);

router.put('/:ammoModelId', AmmunitionTypeController.updateAmmoModel)

router.post('/', AmmunitionTypeController.createAmmoModel )

router.delete('/:ammoModelId',AmmunitionTypeController.deleteAmmoModel )

router.all('*', (req, res) => {
	res.status(404).send( "Not found");
  });

module.exports = router;