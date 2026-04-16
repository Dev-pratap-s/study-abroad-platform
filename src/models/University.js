const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a university name'],
      unique: true,
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Please specify the country'],
    },
    city: {
      type: String,
      required: [true, 'Please specify the city'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    ranking: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Add index to country for fast filtering
universitySchema.index({ country: 1 });

module.exports = mongoose.model('University', universitySchema);
