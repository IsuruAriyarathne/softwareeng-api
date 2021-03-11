const express = require('express');
const WeaponModelController = require('../../controlller/weaponModel.controller');
const router = express.Router();

/**
 * @description get all weapon models
 */
router.get('/', WeaponModelController.getWeaponModels);

module.exports = router;
