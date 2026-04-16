const mongoose = require('mongoose');
const dotenv = require('dotenv');
const University = require('../models/University');
const Program = require('../models/Program');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: './.env' }); // Note: you might need to supply the path or fallback to process.env.MONGODB_URI directly

const dummyUniversities = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tech Institute of Berlin',
    country: 'Germany',
    city: 'Berlin',
    description: 'A leading tech university in the heart of Europe.',
    ranking: 150,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'London College of Business',
    country: 'UK',
    city: 'London',
    description: 'Premier business school for future leaders.',
    ranking: 45,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'California State Engineering',
    country: 'USA',
    city: 'San Francisco',
    description: 'Top engineering programs next to Silicon Valley.',
    ranking: 12,
  }
];

const dummyPrograms = [
  {
    universityId: dummyUniversities[0]._id,
    title: 'MSc in Computer Science',
    field: 'Engineering',
    degreeLevel: 'Masters',
    duration: '2 years',
    tuitionFee: 3000,
  },
  {
    universityId: dummyUniversities[1]._id,
    title: 'MBA in Finance',
    field: 'Business',
    degreeLevel: 'Masters',
    duration: '1 year',
    tuitionFee: 25000,
  },
  {
    universityId: dummyUniversities[2]._id,
    title: 'BSc in Software Engineering',
    field: 'Engineering',
    degreeLevel: 'Bachelors',
    duration: '4 years',
    tuitionFee: 35000,
  }
];

const importData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/study-abroad-platform';
    await mongoose.connect(mongoUri);

    console.log('MongoDB Connected...');

    // Delete existing data
    await University.deleteMany();
    await Program.deleteMany();
    await User.deleteMany(); // Reset users as well

    // Insert new data
    await University.insertMany(dummyUniversities);
    await Program.insertMany(dummyPrograms);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();
