const express = require("express");
const RecoveryController = require('../../controlller/recovery.controller');

const router = express.Router();

router.get('/', RecoveryController.getRecoveries)

router.get('/:recoveryID', RecoveryController.getRecovery);

router.put('/:recoveryID', RecoveryController.updateRecovery)

router.post('/', RecoveryController.createRecovery);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

// router.delete('/:recoveryID', )

module.exports = router;