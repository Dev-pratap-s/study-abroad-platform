const Program = require('../models/Program');

// @desc    Get all programs (can filter by university or field)
// @route   GET /api/programs
// @access  Public
const getPrograms = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    const removeFields = ['page', 'limit'];
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    query = Program.find(JSON.parse(queryStr)).populate({
      path: 'universityId',
      select: 'name country city',
    });

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    query = query.skip(startIndex).limit(limit);

    const programs = await query;

    res.status(200).json({
      success: true,
      count: programs.length,
      data: programs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single program
// @route   GET /api/programs/:id
// @access  Public
const getProgram = async (req, res, next) => {
  try {
    const program = await Program.findById(req.params.id).populate({
      path: 'universityId',
      select: 'name country description',
    });

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json({
      success: true,
      data: program,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPrograms,
  getProgram,
};
