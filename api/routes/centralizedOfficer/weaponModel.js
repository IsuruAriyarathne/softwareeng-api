const express = require("express");
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 
const WeaponModel = require("../../model/weaponModel.model");

const router = express.Router();

router.get('/', (req,res) => {
	let findAll = Controller.findAll(WeaponModel);
	findAll({})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:weaponId', (req, res) => {
	res.send('Unauthorized')
});

router.put('/:weaponId', (req,res) => {
	let update = Controller.update(WeaponModel);
	let condition = DbObject.getWhereObject('weaponID', req.params.weaponId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
	let create = Controller.create(WeaponModel);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));

} )

router.delete('/', (req,res) => {
    res.send('Unauthorized');
} )
router.delete('/:weaponId', (req,res) => {
    res.send('Unauthorized');
} )

module.exports = router;