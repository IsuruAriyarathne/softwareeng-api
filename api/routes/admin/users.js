const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../../model/user.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject');
var generator = require('generate-password');
const router = express.Router();

router.get('/', (req, res) => {
	let findAll = Controller.findAll(User);
	findAll({attributes:['exclude','password']})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.get('/:userId', (req, res) => {
	let findAll = Controller.findAll(User);
	let where = DbObject.getWhereObject('officerID', req.params.userId);
	findAll({where:where,attributes:['exclude','password']})
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
	const {error} = validateUser(req.body);
	if(error) return res.status(400).send(error.detaails[0].message);

	let user = await User.findOne({ officerID: req.body.officerID});
	if(!user) return res.status(400).send("User already registered.");

	user = req.body
	user.password = generator.generate({
		length: 10,
		numbers: true
	});

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password,salt);

	let create = Controller.create(user);
	create(req.body)
		.then((data) => {
			res.send(data)
			
		})
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
