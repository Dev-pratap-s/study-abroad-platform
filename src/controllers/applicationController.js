const Application = require('../models/Application');
const Program = require('../models/Program');

// @desc    Apply to a program
// @route   POST /api/applications
// @access  Private (Student)
const applyToProgram = async (req, res, next) => {
  try {
    const { programId } = req.body;

    // Ensure program exists
    const programExists = await Program.findById(programId);
    if (!programExists) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Creating the application
    const application = await Application.create({
      userId: req.user.id,
      programId,
      status: 'Applied',
    });

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    // Handle duplicate key error manually if needed
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already applied to this program' });
    }
    next(error);
  }
};

// @desc    Get logged in user applications
// @route   GET /api/applications/my-applications
// @access  Private
const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ userId: req.user.id }).populate({
      path: 'programId',
      select: 'title field tuitionFee',
      populate: {
        path: 'universityId',
        select: 'name country',
      },
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyToProgram,
  getMyApplications,
};
