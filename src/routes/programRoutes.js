const express = require('express');
const { getPrograms, getProgram } = require('../controllers/programController');

const router = express.Router();

router.route('/').get(getPrograms);
router.route('/:id').get(getProgram);

module.exports = router;
