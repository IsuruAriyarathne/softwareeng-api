const express = require('express');
const UserController = require('../../controlller/user.controller')
const router = express.Router();
const validateUser = require('../../validator/admin/user.validator');

/**
 * @description get all users
 */
router.get('/', UserController.getUsers);

/**
 * @description update user
 */
router.put('/:userId', validateUser, UserController.updateUser);

/**
 * @description create user
 */
router.post('/', UserController.createUser);


/**
 * @description delete user
 */
router.delete('/:userId', UserController.deleteUser);

/**
 * @description change the password of the user
 */
router.post('/changePassword/:userId', UserController.changePassword);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
