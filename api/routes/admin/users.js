const express = require('express');
const UserController = require('../../controlller/user.controller')
const router = express.Router();
const validateUser = require('../../validator/user.validator');

router.get('/', UserController.getUsers);

router.get('/:userId', UserController.getUser);
router.post('/', validateUser, UserController.createUser);
router.delete('/:userId', UserController.deleteUser);
router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
