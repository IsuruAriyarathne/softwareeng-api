const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello from admin/users')
} )

router.put('/:userId', (req,res) => {

} )

router.post('/', (req,res) => {

} )

router.delete('/:userId', (req,res) => {

} )

module.exports = router;