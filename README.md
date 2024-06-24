Worko Backend
Welcome to Worko Backend, a Node.js application designed for managing user data with robust authentication and RESTful API endpoints.

Overview

Worko Backend provides a seamless interface to handle user information through a secure API. Built with Node.js and Express.js, it ensures efficient CRUD operations with MySQL integration.

Features

User Management: Create, read, update, and delete user records.
Authentication: Secure endpoints with Basic Authentication.
Schema Validation: Utilizes Joi for input validation.
Password Security: Hash passwords using bcryptjs.
Testing: Includes Jest for unit testing with coverage.
Technologies Used
Node.js: JavaScript runtime environment
Express.js: Web application framework
MySQL: Relational database management
Joi: Object schema validation
bcryptjs: Password hashing library
dotenv: Environment variable management
Jest: Testing framework
Webpack: Module bundler
ESLint & Babel: Code linting and transpiling
Postman / curl: API testing tools
VSCode: Integrated Development Environment (IDE)


Getting Started

Prerequisites
Node.js (version 14 or higher)
npm (version 6 or higher)


Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/worko-backend.git
cd worko-backend
Install dependencies:

npm install
Running the Application
Start the server:

npm start

The application will be accessible at: http://localhost:3000.

API Endpoints

List Users: GET /api/worko/user
Get User by ID: GET /api/worko/user/:userId
Create User: POST /api/worko/user
Update User: PUT /api/worko/user/:userId
Partial Update User: PATCH /api/worko/user/:userId
Delete User: DELETE /api/worko/user/:userId


Authentication

All endpoints require Basic Authentication. Use authuser as the username and authpass as the password in the request headers.

Sample Requests


curl -u authuser:authpass -X GET http://localhost:3000/api/worko/user
Get User by ID

curl -u authuser:authpass -X GET http://localhost:3000/api/worko/user/1
Create User

curl -u authuser:authpass -X POST http://localhost:3000/api/worko/user -H "Content-Type: application/json" -d '{"email": "john@example.com", "name": "John Doe", "age": 30, "city": "NY", "zipCode": "10001"}'
Update User

curl -u authuser:authpass -X PUT http://localhost:3000/api/worko/user/1 -H "Content-Type: application/json" -d '{"email": "john@example.com", "name": "John Doe", "age": 31, "city": "NY", "zipCode": "10001"}'
Partial Update User


curl -u authuser:authpass -X PATCH http://localhost:3000/api/worko/user/1 -H "Content-Type: application/json" -d '{"age": 32}'
Delete User


curl -u authuser:authpass -X DELETE http://localhost:3000/api/worko/user/1
Running Unit Tests
To run unit tests and view coverage:

npm test


Environment Variables


Create a .env file in the root directory with the following variables:


DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
AUTH_USER=authuser
AUTH_PASS=authpass
Replace placeholders with your actual database and authentication credentials.

Notes

Ensure MySQL is running and configured properly.
Refer to .env.example for guidance on setting environment variables.
