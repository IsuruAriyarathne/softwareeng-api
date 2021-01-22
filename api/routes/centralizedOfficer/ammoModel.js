const express = require("express");
const AmmunitionTypeController = require('../../controlller/ammoModel.controller')

const router = express.Router();

router.get('/', AmmunitionTypeController.getAmmoModels )

router.get('/:ammoModelID', AmmunitionTypeController.getAmmoModel);

router.put('/:ammoModelID', AmmunitionTypeController.updateAmmoModel)

router.post('/', AmmunitionTypeController.createAmmoModel )

router.delete('/:ammoModelID',AmmunitionTypeController.deleteAmmoModel )

router.delete('/:ammoModelID/:weaponModelID',AmmunitionTypeController.deleteAmmoModel )

router.all('*', (req, res) => {
	res.status(404).send( "Not found");
  });

module.exports = router;