const express = require("express");
const Ammunition = require('../../model/ammunitionBatch.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 

const router = express.Router();

router.get('/', (req,res) => {
	let findAll = Controller.findAll(Ammunition);
	findAll({})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:ammoId', (req, res) => {
	let findAll = Controller.findAll(Ammunition);
	let obj = DbObject.getWhereObject('ammoModelID', req.params.ammoId);
	findAll(obj)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.put('/:ammoId', (req,res) => {
	let update = Controller.update(Ammunition);
	let condition = DbObject.getWhereObject('ammoModelID', req.params.ammoId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
	let create = Controller.create(Ammunition);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.delete('/:ammoId', (req,res) => {
    let deleteEntry = Controller.delete(Ammunition);
    let obj = DbObject.getDeleteObject('ammoModelID',req.params.ammoId)
	deleteEntry(obj)
		.then((result) => {
            if (result) res.send('Success');
            // res.send('Couldnt delete')
		})
		.catch((err) => res.send(err));
} )

module.exports = router;