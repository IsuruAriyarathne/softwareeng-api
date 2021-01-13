const express = require("express");
const data = require('../../config/db');

const router = express.Router();

router.get('/', (req,res) => {
    res.send(data)
} )

router.put('/:userId', (req,res) => {

} )

router.post('/', (req,res) => {

} )

router.delete('/:userId', (req,res) => {

} )

module.exports = router;