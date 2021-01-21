const express = require('express');
const CompanyController = require('../../controlller/company.controller')
const router = express.Router();

router.get('/',	CompanyController.getCompanies);

router.get('/:supplierID', CompanyController.getCompany);

router.put('/:supplierID', CompanyController.updateCompany);

router.post('/', CompanyController.createCompany);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
