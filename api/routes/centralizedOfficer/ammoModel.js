const express = require("express");
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 
const AmmunitionType = require("../../model/ammunitionType.model");

const router = express.Router();

router.get('/', (req,res) => {
	let findAll = Controller.findAll(AmmunitionType);
	findAll({})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:ammoId', (req, res) => {
	res.send('Unauthorized');
});

router.put('/:ammoId', (req,res) => {
	let update = Controller.update(AmmunitionType);
	let condition = DbObject.getWhereObject('ammoModelID', req.params.ammoId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
	let create = Controller.create(AmmunitionType);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));} )

router.delete('/', (req,res) => {
	res.send('Unauthorized');
} )

router.delete('/:ammoId', (req,res) => {
	res.send('Unauthorized');
} )

module.exports = router;