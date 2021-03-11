const express = require("express");
const AmmunitionTypeController = require('../../controlller/ammoModel.controller')
const router = express.Router();

/**
 * @description get all ammunition models
 */
router.get('/', AmmunitionTypeController.getAmmoModels )


module.exports = router;