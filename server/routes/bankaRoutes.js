const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const {
    createBank,
    deleteBank,
    udpateBank,
    getBank
} = require('../controllers/bankController.js');

router.route('/:id').get(getBank).delete(deleteBank).put(udpateBank);
router.route('/').post(createBank);
module.exports = router;