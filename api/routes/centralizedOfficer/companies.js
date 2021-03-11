const express = require('express');
const CompanyController = require('../../controlller/company.controller')
const validateCompanies = require('../../validator/companies.validator');
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
router.put('/:supplierID', validateCompanies, CompanyController.updateCompany);

/**
 * @description create new company
 */
router.post('/', validateCompanies, CompanyController.createCompany);

/**
 * @description delete company, companies which are not foreign keys are only deleted
 */
router.delete('/:supplierID', CompanyController.deleteCompany);

/**
 * @description delete company, ammunition type
 */
router.delete('/:supplierID/:ammoModelID', CompanyController.deleteAmmunitionTypes);
/**
 * @description delete company, weapon Model Type
 */
router.delete('/:supplierID/:weaponModelID', CompanyController.deleteWeaponModel);


module.exports = router;
