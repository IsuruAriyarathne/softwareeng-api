const express = require('express');
const UserController = require('../../controlller/user.controller')
const router = express.Router();

router.get('/', UserController.getUsers);

router.get('/:userId', UserController.getUser);

router.post('/',async(req, res) => {
	//validate the user
	const {error} = validateUser(req.body);
	if(error) return res.status(400).send(error.detaails[0].message);

router.post('/', UserController.createUser);

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
router.delete('/:userId', UserController.deleteUser);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
