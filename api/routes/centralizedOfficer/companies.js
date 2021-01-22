const express = require('express');
const CompanyController = require('../../controlller/company.controller')
const router = express.Router();

/**
 * @description get all companies
 */
router.get('/',	CompanyController.getCompanies);

/**
 * @description get the ammunitions types and weapon models supplied by company
 */
router.get('/:supplierID', CompanyController.getCompany);

/**
 * @description update company can add ammunition types and weapon models supplied by company
 */
router.put('/:supplierID', CompanyController.updateCompany);

/**
 * @description create new company
 */
router.post('/', CompanyController.createCompany);


router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
