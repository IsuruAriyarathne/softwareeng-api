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

router.post('/',async(req, res) => {
	//validate the user
	const {error} = validate(req.body);
	if(error) return res.status(400).send(error.detaails[0].message);

	let user = await User.findOne({ officerID: req.body.officerID});
	if(user) return res.status(400).send("User already registered.");

	user = new User({
		officerID: req.body.officerID,
		name: req.body.name,
		location: req.body.location,
		password: req.body.password,
		role: req.body.role,
		stationID: req.body.stationID
	});

	await user.save();

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
