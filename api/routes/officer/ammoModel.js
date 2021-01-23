const express = require("express");
const AmmunitionTypeController = require('../../controlller/ammoModel.controller')
const router = express.Router();

/**
 * @description get all ammunition models
 */
router.get('/', AmmunitionTypeController.getAmmoModels )

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: "Not found" });
  });

module.exports = router;