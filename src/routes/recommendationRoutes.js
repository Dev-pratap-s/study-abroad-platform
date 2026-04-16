const express = require('express');
const { getRecommendations } = require('../controllers/recommendationController');

const router = express.Router();

// Accessible via public (could also require auth if we want to extract preferences from User)
router.get('/', getRecommendations);

module.exports = router;
