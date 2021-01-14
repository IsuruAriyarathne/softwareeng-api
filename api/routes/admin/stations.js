const express = require("express");
const user = require('../../controlller/station.controller'); 

const router = express.Router();

router.get('/', (req,res) => {
    user.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.put('/:stationId', (req,res) => {
<<<<<<< HEAD
    user.update()
    .then(data => res.send(data))
    .catch(err => console.log(err))
=======
    
>>>>>>> 1fcd2cdb30d0968d5de33860d1dd7670cfb09df8
} )

router.post('/', (req,res) => {
    user.create()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.delete('/:stationId', (req,res) => {
    user.destroy()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

module.exports = router;