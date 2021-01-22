const express = require("express");
const Station = require('../../model/station.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 
const {validateStationSchema} = require('../../validator/station.validator'); 

const router = express.Router();

router.get('/', (req,res) => {
	let findAll = Controller.findAll(Station);
	console.log("In");
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

router.post('/', async(req,res) => {   
	//validate the station
	try{
		const result = await validateStationSchema.validateAsync(req.body);
		const station = new Station(result);
		
		const savedStation = await station.save();

		let create = Controller.create(savedStation);
		create(req.body)
			.then((data) => res.send(data))
			.catch((err) => console.log(err));
		return res.status(200).send("Station added successfully.");
	}
	catch(err){
		return res.status(400).send(err.details[0].message);
	}	
			
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