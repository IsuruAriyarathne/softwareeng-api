const express = require('express');
const UserController = require('../../controlller/user.controller')
const router = express.Router();

router.get('/', UserController.getUsers);

router.get('/:userId', UserController.getUser);

router.put('/:userId', UserController.updateUser);

router.post('/', UserController.createUser);

router.delete('/:userId', UserController.deleteUser);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
