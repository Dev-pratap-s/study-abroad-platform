const express = require('express');
const { applyToProgram, getMyApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All application routes require authentication
router.use(protect);

router.post('/', applyToProgram);
router.get('/my-applications', getMyApplications);

module.exports = router;
