const express = require("express");
const Weapon = require('../../model/weapon.model');
const Order = require('../../model/order.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 

const router = express.Router();

router.get('/', (req,res) => {
	let findAll = Controller.findAll(Weapon);
	let obj = DbObject.getIncludeObject([Order])
	findAll({},[],obj)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:weaponId', (req, res) => {
	let findAll = Controller.findAll(Weapon);
	let obj = DbObject.getWhereObject('weaponID', req.params.weaponId);
	findAll(obj)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.put('/::weaponId', (req,res) => {
	let update = Controller.update(Weapon);
	console.log(here);
	let condition = DbObject.getWhereObject('weaponID', req.params.weaponId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
	let create = Controller.create(Weapon);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.delete('/:weaponId', (req,res) => {
    let deleteEntry = Controller.delete(Weapon);
    let obj = DbObject.getDeleteObject('weaponID',req.params.userId)
	deleteEntry(obj)
		.then((result) => {
            if (result) res.send('Success');
            // res.send('Couldnt delete')
		})
		.catch((err) => res.send(err));
} )

module.exports = router;