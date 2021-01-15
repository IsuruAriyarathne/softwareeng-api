const express = require("express");
const station = require('../../controlller/station.controller'); 

const router = express.Router();

router.get('/', (req,res) => {
    station.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.put('/:stationId', (req,res) => {
    station.update()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.post('/', (req,res) => {
    station.create()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

router.delete('/:stationId', (req,res) => {
    station.destroy()
    .then(data => res.send(data))
    .catch(err => console.log(err))
} )

module.exports = router;