const express = require('express');
const Company = require('../../model/supplier.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject');

const router = express.Router();

router.get('/', (req, res) => {
	let findAll = Controller.findAll(Company);
	findAll({})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.get('/:supplierID', (req, res) => {
	let findAll = Controller.findAll(Company);
	let where = DbObject.getWhereObject('supplierID', req.params.supplierID);
	findAll({where:where})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.put('/:supplierID', (req, res) => {
	let update = Controller.update(Company);
	let condition = DbObject.getWhereObject('supplierID', req.params.supplierID);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.post('/', (req, res) => {
	let create = Controller.create(Company);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.delete('/:supplierID', (req, res) => {
	res.send('Unauthorized');
});

module.exports = router;
