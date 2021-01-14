const express = require("express");
const user = require('../../controlller/user.controller');

const router = express.Router();

router.get('/', (req,res) => {
    user.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.put('/:userId', (req,res) => {

} )

router.post('/', (req,res) => {

} )

router.delete('/:userId', (req,res) => {

} )

module.exports = router;