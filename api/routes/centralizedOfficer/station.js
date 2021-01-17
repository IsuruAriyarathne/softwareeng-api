const express = require("express");
const Station = require('../../model/station.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 

const router = express.Router();

router.get('/', (req,res) => {
	let findAll = Controller.findAll(Station);
	findAll({})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:stationId', (req, res) => {
	let findAll = Controller.findAll(Station);
	let where = DbObject.getWhereObject('stationID', req.params.stationId);
	findAll({where:where})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.put('/:stationId', (req,res) => {
	let update = Controller.update(Station);
	let condition = DbObject.getWhereObject('stationID', req.params.stationId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
	let create = Controller.create(Station);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.delete('/:stationId', (req,res) => {
    let deleteEntry = Controller.delete(Station);
    let obj = DbObject.getDeleteObject('stationID',req.params.stationId)
	deleteEntry(obj)
		.then((result) => {
            res.send('Success');
            // res.send('Couldnt delete')
		})
		.catch((err) => res.send(err));
} )

module.exports = router;