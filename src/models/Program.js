const mongoose = require('mongoose');

const programSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a program title'],
    },
    field: {
      type: String,
      required: [true, 'Please specify the field of study (e.g., Engineering, Business)'],
    },
    degreeLevel: {
      type: String,
      enum: ['Bachelors', 'Masters', 'PhD'],
      required: [true, 'Please specify the degree level'],
    },
    duration: {
      type: String, // e.g. "4 years", "2 years"
      required: [true, 'Please specify the duration'],
    },
    tuitionFee: {
      type: Number, // Assuming it's in USD or a standardized currency
      required: [true, 'Please specify the tuition fee per year'],
    },
  },
  { timestamps: true }
);

// Indexes support fast aggregations for the recommendation system
programSchema.index({ field: 1 });
programSchema.index({ tuitionFee: 1 });

module.exports = mongoose.model('Program', programSchema);
