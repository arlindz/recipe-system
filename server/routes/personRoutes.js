const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const {
    createPerson,
    deletePerson,
    updatePerson,
    getPerson
} = require('../controllers/personController.js');

router.route('/:id').get(getPerson).delete(deletePerson).put(updatePerson);
router.route('/').post(createPerson);
module.exports = router;