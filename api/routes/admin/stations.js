const express = require("express");
const StationController = require('../../controlller/station.controller'); 
const validateStation = require('../../validator/station.validator'); 


// router.put('/:stationId', (req,res) => {
// 	let update = Controller.update(Station);
// 	let condition = DbObject.getWhereObject('stationID', req.params.stationId);
// 	update(condition, req.body)
// 		.then((data) => res.send(data))
// 		.catch((err) => console.log(err));
// } )

// router.post('/', async(req,res) => {   
// 	//validate the station
// 	try{
// 		const result = await validateStationSchema.validateAsync(req.body);
// 		const station = new Station(result);
		
// 		const savedStation = await station.save();

// 		let create = Controller.create(savedStation);
// 		create(req.body)
// 			.then((data) => res.send(data))
// 			.catch((err) => console.log(err));
// 		return res.status(200).send("Station added successfully.");
// 	}
// 	catch(err){
// 		return res.status(400).send(err.details[0].message);
// 	}	
			
// } )
const router = express.Router();

router.get('/', StationController.getStations)

router.get('/:stationId', StationController.geStation);

router.put('/:stationId', validateStation, StationController.updateStation )

router.post('/', validateStation, StationController.createStation)

router.delete('/:stationId', StationController.deleteStation)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});
module.exports = router;