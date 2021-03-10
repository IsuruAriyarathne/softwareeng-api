const express = require("express");
const WeaponController= require("../../controlller/weapon.controller");
const validateWeapon = require("../../validator/weapon.validator");

const router = express.Router();
/**
 * @description get all the weapons
 */
router.get('/', WeaponController.getWeapons )

/**
 * @description get the weapon assigned stations
 */
router.get('/:weaponID', WeaponController.getWeapon);

/**
 * @description update weapon, add a station
 */
router.put('/:weaponID', validateWeapon, WeaponController.updateWeapon )

/**
 * @description create new weapon
 */
router.post('/', validateWeapon, WeaponController.createWeapon)

/**
 * @description delete weapon, weapon which is not a foreign key are only deleted
 */
router.delete('/', validateWeapon, WeaponController.deleteWeapon)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;