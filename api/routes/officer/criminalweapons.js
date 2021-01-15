const express = require("express");
const Criminalweapon = require('../../model/user.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject');

const router = express.Router();

router.get('/', (req,res) => {
	let findAll = Controller.findAll(Criminalweapon);
	findAll({})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:weaponId', (req, res) => {
	let findAll = Controller.findAll(Criminalweapon);
	let obj = DbObject.getWhereObject('recoveryID', req.params.userId);
	findAll(obj)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.put('/::weaponId', (req,res) => {
	let update = Controller.update(Criminalweapon);
	let condition = DbObject.getWhereObject('recoveryID', req.params.userId);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
	let create = Controller.create(Criminalweapon);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.delete('/:weaponId', (req,res) => {
    let deleteEntry = Controller.delete(Criminalweapon);
    let obj = DbObject.getDeleteObject('recoveryID',req.params.userId)
	deleteEntry(obj)
		.then((result) => {
            if (result) res.send('Success');
            // res.send('Couldnt delete')
		})
		.catch((err) => res.send(err));
} )

module.exports = router;