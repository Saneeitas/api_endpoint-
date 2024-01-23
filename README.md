# api_endpoint-

A backend service using Node.js, MongoDB, and the Express framework. It includes essential endpoints such as login using JWT, fetching user records with filtering options, and showcasing advanced skills in creating multiple relationships between schemas and handling expensive operations

## Features

- User registration with password hashing
- JWT authentication for user login
- Flexible user data retrieval with filtering options
- MongoDB integration for data storage
- Error handling and security measures

## Usage

## Base Url
``
   https://api-endpoints-jmi7.onrender.com
 ``

Routes

- /api/register: Register a new user.
- /api/login: Log in with existing credentials.
- /api/users/exact: Get users with exact matching filters.
- /api/users/regex: Get users with regex matching filters.
- /api/users/by-dateAdded: Get users filtered by dateAdded.
- /api/users/by-firstName: Get users filtered by firstName.
- /api/users/by-lastName: Get users filtered by lastName.
- /api/users/:userId/posts: Add a post to a specific user.
- /api/users/with-posts: Get users with their associated posts.

# Authentication

- Register
- Endpoint: ``/api/register``
- Method: POST
- Description: Register a new user.
- Request:
`` {
  "firstName": "John",
  "lastName": "Doe",
  "username": "john_doe",
  "password": "password123"
  }
  ``
  - Response:
``{
  "token": "your generate jwt token"
  }
``

- Login
- Endpoint: ``/api/login``
- Method: POST
- Description: Login a user, Authenticate an existing user.
- Request:
`` {
  "user": {
    "_id": "5f26710c09524500170591bb",
    "firstName": "John",
    "lastName": "Doe",
    "username": "john_doe",
    "dateAdded": "2024-01-22T20:15:43.061Z"
  },
  "token": "your generate jwt token"
}
  ``
  - Response:
``{
  "token": "your generate jwt token"
  }
``

## User Operations
- Get Users (Exact Match)
- Endpoint: ``/api/users/exact``
- Method: GET
- Description: Get users with exact matching criteria.
- Query Parameters:
    - dateAdded (optional): Filter users by date added.
    - firstName (optional): Filter users by first name.
    - lastName (optional): Filter users by last name.
- Response:
``[
  {
    "_id": "5f26710c09524500170591bb",
    "firstName": "John",
    "lastName": "Doe",
    "username": "john_doe",
    "dateAdded": "2024-01-22T20:15:43.061Z"
  },
  // ... other user objects
]
``
- Get Users (Exact Match)
- Endpoint: ``/api/users/regex``
- Method: GET
- Description: Get users with regex matching criteria.
- Query Parameters:
    - dateAdded (optional): Filter users by date added using regex.
    - firstName (optional): Filter users by first name using regex.
    - lastName (optional): Filter users by last name using regex.
- Response:
``[
  {
    "_id": "5f26710c09524500170591bb",
    "firstName": "John",
    "lastName": "Doe",
    "username": "john_doe",
    "dateAdded": "2024-01-22T20:15:43.061Z"
  },
  // ... other user objects
]
``

-Get Users by Date Added
-Endpoint: ``/api/users/by-dateAdded``
- Method: GET
- Description: Get users filtered by the exact date added
- Query Parameter
    - dateAdded (required): Filter users by date added.
- Response:
``[
  {
    "_id": "5f26710c09524500170591bb",
    "firstName": "John",
    "lastName": "Doe",
    "username": "john_doe",
    "dateAdded": "2024-01-22T20:15:43.061Z"
  },
  // ... other user objects
]
``

-Get Users by First Name
-Endpoint: ``/api/users/by-firstName``
- Method: GET
- Description: Get users filtered by the first name.
- Query Parameter
    - firstName (required): Filter users  first name.
- Response:
``[
  {
    "_id": "5f26710c09524500170591bb",
    "firstName": "John",
    "lastName": "Doe",
    "username": "john_doe",
    "dateAdded": "2024-01-22T20:15:43.061Z"
  },
  // ... other user objects
]
``

-Get Users by Last Name
-Endpoint: ``/api/users/by-lastName``
- Method: GET
- Description: Get users filtered by the last name..
- Query Parameter
    - lastName (required): Filter users last name..
- Response:
``[
  {
    "_id": "5f26710c09524500170591bb",
    "firstName": "John",
    "lastName": "Doe",
    "username": "john_doe",
    "dateAdded": "2024-01-22T20:15:43.061Z"
  },
  // ... other user objects
]  
``

- Add Post to User
- Endpoint: ``/api/users/:userId/posts``
- Method: POST
- Description: Add a new post to a user.
- Path Parameter:
      - userId (required): ID of the user to add a post to.
- Request:
``{
  "title": "New Post",
  "content": "This is the content of the new post."
}
``
- Response:
``[
  {
    "title": "New Post",
    "content": "This is the content of the new post."
  },
  // ... other post objects
]
``

- Get Users with Posts
- Endpoint: ``/api/users/with-posts``
- Method: GET
- Description: Get users with their associated posts.
- Response:
``[
  {
    "_id": "5f26710c09524500170591bb",
    "firstName": "John",
    "lastName": "Doe",
    "username": "john_doe",
    "dateAdded": "2024-01-22T20:15:43.061Z",
    "posts": [
      {
        "title": "Post Title 1",
        "content": "Post content 1."
      },
      // ... other post objects
    ]
  },
  // ... other user objects
]
``

