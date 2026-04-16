const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
      required: true,
    },
    status: {
      type: String,
      enum: ['Applied', 'In Review', 'Accepted', 'Rejected'],
      default: 'Applied',
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications by enforcing unique user and program compound index
applicationSchema.index({ userId: 1, programId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
