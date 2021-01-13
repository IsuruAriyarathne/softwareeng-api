const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello from officer/criminalweapons')
} )

router.put('/::weaponId', (req,res) => {

} )

router.post('/', (req,res) => {

} )

router.delete('/:weaponId', (req,res) => {

} )

module.exports = router;