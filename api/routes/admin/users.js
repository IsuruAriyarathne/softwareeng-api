const express = require("express");
const user = require('../../controlller/user.controller');

const router = express.Router();

router.get('/', (req,res) => {
    user.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.put('/:userId', (req,res) => {
<<<<<<< HEAD
    user.update()
=======
    console.log(req.body);
    console.log("uP");
    console.log(req.params.userId);
    user.update({officerID:req.params.userId, ...req.body})
>>>>>>> 1fcd2cdb30d0968d5de33860d1dd7670cfb09df8
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.post('/', (req,res) => {
<<<<<<< HEAD
    user.create()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.delete('/:userId', (req,res) => {
    user.destroy()
    .then(data => res.send(data))
    .catch(err => console.log(err))
=======
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
>>>>>>> 1fcd2cdb30d0968d5de33860d1dd7670cfb09df8
} )

module.exports = router;