## Endpoint: `/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It accepts user details, hashes the password, creates a new user in the database, and returns an authentication token along with the user details.

### Request Body:
The request body should be a JSON object containing the following fields:
- `fullName`: An object containing:
  - `firstName`: The first name of the user (required, trimed minimum 3 characters and it's string type).
  - `lastName`: The last name of the user (optional it's also a string).
- `email`: The email address of the user (required).
- `password`: The password for the user account (required).

### Example Request:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
