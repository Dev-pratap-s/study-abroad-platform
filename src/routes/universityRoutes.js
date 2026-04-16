const express = require('express');
const { getUniversities, getUniversity } = require('../controllers/universityController');

const router = express.Router();

router.route('/').get(getUniversities);
router.route('/:id').get(getUniversity);

module.exports = router;
