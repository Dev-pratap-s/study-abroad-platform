const Program = require('../models/Program');
const mongoose = require('mongoose');

// @desc    Get program recommendations
// @route   GET /api/recommendations
// @access  Public
const getRecommendations = async (req, res, next) => {
  try {
    const { budget, country, field } = req.query;

    const pipeline = [];

    // 1. Join with University to filter by Country if provided
    pipeline.push({
      $lookup: {
        from: 'universities',           // Database collection name
        localField: 'universityId',     // Field in the Program model
        foreignField: '_id',            // Field in the University model
        as: 'universityDetails'         // Array of matched universities (will be 1)
      }
    });

    // 2. Unwind the university context from an array to an object
    pipeline.push({ $unwind: '$universityDetails' });

    // 3. Match filters based on query parameters
    const matchStage = {};

    if (budget) {
      matchStage.tuitionFee = { $lte: Number(budget) };
    }

    if (country) {
      // Allow case-insensitive search
      matchStage['universityDetails.country'] = { $regex: new RegExp(country, 'i') };
    }

    if (field) {
      matchStage.field = { $regex: new RegExp(field, 'i') };
    }

    // Only add a match stage if there is something to filter
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // 4. Sort recommendations by tuitionFee (lowest first) optionally
    pipeline.push({ $sort: { tuitionFee: 1 } });

    // 5. Optionally limit recommendations to top 10
    pipeline.push({ $limit: 10 });

    const recommendations = await Program.aggregate(pipeline);

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendations,
};
