🌍✈️ Study Abroad Platform - Backend API

Hello! 👋 Welcome to the backend of the Study Abroad Platform.
This project is built using Node.js, Express, and MongoDB.

It follows the MVC (Model-View-Controller) structure so the code is clean and easy to manage.

With this platform, students can:

Search universities 🎓
Filter programs based on budget, field, and country 💰
Apply to programs 📝
Track their application status 📊
🌟 Project Overview

Main features of this backend:

Authentication:
Secure signup and login using JWT 🔐
Universities & Programs:
Users can view all universities and programs with filtering and pagination
Applications:
Students can apply to programs
(Duplicate applications are prevented using database rules)
Recommendations:
Programs are suggested based on user preferences like country, budget, and field 💡
🏗️ Folder Structure

The project follows MVC pattern:

/src/models/ → Database models (User, University, Program, Application)
/src/controllers/ → Main logic (handling data and requests)
/src/routes/ → API routes (GET, POST, etc.)
/src/middleware/ → Extra functions (auth check, error handling)
/src/seed/ → Script to add sample data
🛠️ Setup Steps

Follow these steps to run the project locally:

1. Clone the project
git clone <repository_url>
cd "Study Abroad platform"
2. Install dependencies
npm install
3. Create .env file

Add this in root folder:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/study-abroad-platform
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=30d

👉 Make sure MongoDB is running locally
(or use MongoDB Atlas URL)

4. Add sample data (optional)
node src/seed/seedData.js
5. Start server
npm run dev

Server will auto-restart when you make changes 🚀

🔄 Project Flow (Simple)
User Register
API: /api/auth/register
Password is securely hashed
Login
API: /api/auth/login
User gets a JWT token
Browse
User can view universities and programs
No token needed
Get Recommendations
API: /api/recommendations?budget=5000&country=UK
Backend finds best matching programs
Apply
API: /api/applications
Requires JWT token
Prevents duplicate applications
🧠 How Recommendation Works (Easy)

It uses MongoDB Aggregation Pipeline:

$lookup → Join Program with University
$unwind → Convert array to object
$match → Filter by:
Budget
Country
Field
$sort → Sort by lowest fee
$limit → Return top results

👉 This is fast because filtering happens directly in the database

🚀 API Usage (Postman)

Base URL:

http://localhost:5000
🔐 Authentication

Register

POST /api/auth/register
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "password": "123456"
}

Login

POST /api/auth/login

👉 Copy token from response
Use it like:

Authorization: Bearer <token>
🎓 Universities & Programs

Get Universities

GET /api/universities?page=1&limit=5

Filter by Country

GET /api/universities?country=Germany

Get Programs

GET /api/programs
💡 Recommendations
GET /api/recommendations?budget=10000&country=UK&field=Business

👉 Returns programs matching your filters

📝 Applications (Token Required)

Apply

POST /api/applications

Header:

Authorization: Bearer <token>

Body:

{
  "programId": "program_id_here"
}

👉 Duplicate apply = error

My Applications

GET /api/applications/my-applications
🚀 Done!