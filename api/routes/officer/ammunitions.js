const express = require("express");
const AmmunitionBatch = require('../../model/ammunitionBatch.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 
const AmmunitionStation = require("../../model/ammunitionStation.model");
const AmmunitionType = require("../../model/ammunitionType.model");

const router = express.Router();

router.get('/:stationID', (req,res) => {
	let findAll = Controller.findAll(AmmunitionStation);
	let include = DbObject.getIncludeObject([AmmunitionType])
	let where = DbObject.getWhereObject('stationID',req.body.stationID)
	findAll({where:where,include:include})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

// router.get('/:ammoId', (req, res) => {
// 	res.send('Unauthorized');
// });

router.put('/:ammoId', (req,res) => {
	let update = Controller.update(Ammunition);
	let condition = DbObject.getWhereObject('ammoModelID', req.params.ammoId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
	res.send('Unauthorized');
} )

router.delete('/', (req,res) => {
	res.send('Unauthorized');
} )

router.delete('/:ammoId', (req,res) => {
	res.send('Unauthorized');
} )

module.exports = router;