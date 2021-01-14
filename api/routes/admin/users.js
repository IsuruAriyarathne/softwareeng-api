const express = require("express");
const user = require('../../controlller/user.controller');

const router = express.Router();

router.get('/', (req,res) => {
    user.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.put('/:userId', (req,res) => {
    console.log(req.body);
    console.log(req.params.userId);
    user.update({officerId:req.params.userId, ...req.body})
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.post('/', (req,res) => {
    console.log(req.body);
    user.create(req.body)
    .then(data => res.send(data))
    .catch(err => res.send(err))
    // res.send("Success")
} )

router.delete('/:userId', (req,res) => {
    user.delete(req.params.userId)
    .then(() => res.send("Success"))
    .catch(err => res.send(err))
} )

module.exports = router;