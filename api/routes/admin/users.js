const express = require('express');
const UserController = require('../../controlller/user.controller')
const router = express.Router();

/**
 * @description get all users
 */
router.get('/', UserController.getUsers);

/**
 * @description get user
 */
router.get('/:userId', UserController.getUser);

/**
 * @description update user
 */
router.put('/:userId', UserController.updateUser);

/**
 * @description create user
 */
router.post('/', UserController.createUser);


/**
 * @description delete user
 */
router.delete('/:userId', UserController.deleteUser);
router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
