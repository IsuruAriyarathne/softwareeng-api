const express = require('express');
const User = require('../../model/user.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject');

const router = express.Router();

router.get('/', (req, res) => {
	let findAll = Controller.findAll(User);
	findAll({},['password'])
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.get('/:userId', (req, res) => {
	let findAll = Controller.findAll(User);
	let obj = DbObject.getWhereObject('officerID', req.params.userId);
	findAll(obj,['password'])
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.put('/:userId', (req, res) => {
	let update = Controller.update(User);
	let condition = DbObject.getWhereObject('officerID', req.params.userId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.post('/', (req, res) => {
	let create = Controller.create(User);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.delete('/:userId', (req, res) => {
    let deleteEntry = Controller.delete(User);
    let obj = DbObject.getDeleteObject('officerID',req.params.userId)
	deleteEntry(obj)
		.then((result) => {
            if (result) res.send('Success');
            // res.send('Couldnt delete')
		})
		.catch((err) => res.send(err));
});

module.exports = router;
