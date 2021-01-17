const express = require('express');
const WeaponStation = require('../../model/weaponStation.model');
const Weapon = require('../../model/weapon.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject');
const WeaponModel = require('../../model/weaponModel.model');
const { converter } = require('../../services/objectConverter');
const { object } = require('joi');
const router = express.Router();

router.get('/:stationID', (req,res) => {
	let findAll = Controller.findAll(WeaponStation);
	let include = DbObject.getIncludeObject([[Weapon,WeaponModel]])
	let where = DbObject.getWhereObject('stationID',req.params.stationID)
	findAll({ where: where, include: include })
	.then((data) => {
		// console.log(data);

		data = data.map((item) => converter(item.dataValues));
		console.log(data);
		res.send(data);
	})
});

// router.get('/:weaponId', (req, res) => {
// 	res.send('Unauthorized')
// });

router.put('/:weaponId', (req, res) => {
	let update = Controller.update(Weapon);
	let condition = DbObject.getWhereObject('weaponID', req.params.weaponId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.post('/', (req, res) => {
	res.send('Unauthorized');
});

router.delete('/', (req, res) => {
	res.send('Unauthorized');
});
router.delete('/:weaponId', (req, res) => {
	res.send('Unauthorized');
});

module.exports = router;
