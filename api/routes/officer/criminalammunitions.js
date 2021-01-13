const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello from officer/criminalammunitions')
} )

router.put('/:ammoId', (req,res) => {

} )

router.post('/', (req,res) => {

} )

router.delete('/:ammoId', (req,res) => {

} )

module.exports = router;