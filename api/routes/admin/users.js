const express = require("express");
const user = require('../../controlller/user.controller');

const router = express.Router();

router.get('/', (req,res) => {
    user.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.put('/:userId', (req,res) => {
    user.update()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.post('/', (req,res) => {
    user.create()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.delete('/:userId', (req,res) => {
    user.destroy()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

module.exports = router;