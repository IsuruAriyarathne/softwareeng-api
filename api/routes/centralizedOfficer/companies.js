const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello from centralizedOfficer/companies')
} )

router.put('/:companyId', (req,res) => {

} )

router.post('/', (req,res) => {

} )

router.delete('/:companyId', (req,res) => {

} )

module.exports = router;