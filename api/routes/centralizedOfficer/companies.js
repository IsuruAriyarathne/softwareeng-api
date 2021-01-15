const express = require("express");
const Company = require('../../model/user.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 

const router = express.Router();

router.get('/', (req,res) => {
	let findAll = Controller.findAll(Company);
	findAll({})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:companyId', (req,res) => {
	let findAll = Controller.findAll(Company);
	let obj = DbObject.getWhereObject('supplierID', req.params.userId);
	findAll(obj)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.put('/:companyId', (req,res) => {
	let update = Controller.update(Company);
	let condition = DbObject.getWhereObject('supplierID', req.params.userId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
	let create = Controller.create(Company);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.delete('/:companyId', (req,res) => {
    let deleteEntry = Controller.delete(Station);
    let obj = DbObject.getDeleteObject('supplierID',req.params.userId)
	deleteEntry(obj)
		.then((result) => {
            if (result) res.send('Success');
            // res.send('Couldnt delete')
		})
		.catch((err) => res.send(err));
} )

module.exports = router;