# api_endpoint-

A backend service using Node.js, MongoDB, and the Express framework. It includes essential endpoints such as login using JWT, fetching user records with filtering options, and showcasing advanced skills in creating multiple relationships between schemas and handling expensive operations

## Features

- User registration with password hashing
- JWT authentication for user login
- Flexible user data retrieval with filtering options
- MongoDB integration for data storage
- Error handling and security measures

## Usage

The server will be running at http://localhost:3000 with base url: http://localhost:3000/api

Routes

- /register: Register a new user.
- /login: Log in with existing credentials.
- /users/exact: Get users with exact matching filters.
- /users/regex: Get users with regex matching filters.
- /users/by-dateAdded: Get users filtered by dateAdded.
- /users/by-firstName: Get users filtered by firstName.
- /users/by-lastName: Get users filtered by lastName.
- /users/:userId/posts: Add a post to a specific user.
- /users/with-posts: Get users with their associated posts.

Routes
User Registration
Endpoint: /register
Method: POST
Payload:
json
Copy code
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "password": "securepassword"
}
Response: Returns a JWT token on successful registration.
User Login
Endpoint: /login
Method: POST
Payload:
json
Copy code
{
  "username": "johndoe",
  "password": "securepassword"
}
Response: Returns user information and a JWT token on successful login.
Get Users with Exact Matching Filters
Endpoint: /users/exact
Method: GET
Query Parameters: (Optional)
dateAdded: Date in the format 'YYYY-MM-DD'
firstName: First name for exact matching
lastName: Last name for exact matching
Response: Returns an array of users.
Get Users with Regex Matching Filters
Endpoint: /users/regex
Method: GET
Query Parameters: (Optional)
dateAdded: Date in the format 'YYYY-MM-DD'
firstName: First name for regex matching (case-insensitive)
lastName: Last name for regex matching (case-insensitive)
Response: Returns an array of users.
Get Users by Date Added
Endpoint: /users/by-dateAdded
Method: GET
Query Parameters:
dateAdded: Date in the format 'YYYY-MM-DD'
Response: Returns an array of users.
Get Users by First Name
Endpoint: /users/by-firstName
Method: GET
Query Parameters:
firstName: First name for exact matching
Response: Returns an array of users.
Get Users by Last Name
Endpoint: /users/by-lastName
Method: GET
Query Parameters:
lastName: Last name for exact matching
Response: Returns an array of users.
Add Post to User
Endpoint: /users/:userId/posts
Method: POST
Params:
userId: ID of the user
Payload:
json
Copy code
{
  "title": "New Post",
  "content": "Lorem ipsum dolor sit amet."
}
Response: Returns an array of posts for the user.
Get Users with Posts
Endpoint: /users/with-posts
Method: GET
Response: Returns an array of users with their associated posts.
