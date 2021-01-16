const express = require("express");
const WeaponStation = require('../../model/weaponStation.model');
const Weapon = require('../../model/weapon.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 
const WeaponModel = require("../../model/weaponModel.model");

const router = express.Router();

router.get('/', (req,res) => {
	let findAll = Controller.findAll(WeaponStation);
	console.log("In");
	let include = DbObject.getIncludeObject([[Weapon,WeaponModel]])
	console.log(include);
	let where = DbObject.getWhereObject('stationID',req.body.stationID)
	findAll(where,[],include)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:weaponId', (req, res) => {
	let findAll = Controller.findAll(WeaponStation);
	let obj = DbObject.getWhereObject('weaponID', req.params.weaponId);
	findAll(obj)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.put('/::weaponId', (req,res) => {
	let update = Controller.update(WeaponStation);
	console.log(here);
	let condition = DbObject.getWhereObject('weaponID', req.params.weaponId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
	let create = Controller.create(WeaponStation);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.delete('/:weaponId', (req,res) => {
    let deleteEntry = Controller.delete(WeaponStation);
    let obj = DbObject.getDeleteObject('weaponID',req.params.weaponId)
	deleteEntry(obj)
		.then((result) => {
            if (result) res.send('Success');
            // res.send('Couldnt delete')
		})
		.catch((err) => res.send(err));
} )

module.exports = router;