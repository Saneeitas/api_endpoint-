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

