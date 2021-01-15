const express = require("express");
// const user = require('../../controlller/company.controller');  

const router = express.Router();

router.get('/', (req,res) => {
    user.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.put('/:companyId', (req,res) => {
    user.update()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.post('/', (req,res) => {
    user.create()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.delete('/:companyId', (req,res) => {
    user.destroy()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

module.exports = router;