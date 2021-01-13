const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello from admin/stations')
} )

router.put('/:stationId', (req,res) => {

} )

router.post('/', (req,res) => {

} )

router.delete('/:stationId', (req,res) => {

} )

module.exports = router;