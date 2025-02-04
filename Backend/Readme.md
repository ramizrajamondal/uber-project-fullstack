# Backend Api Documentation

## EndpointOne: `/users/register`

# Title
Registers a new user by creating a user account with provide information

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

## END POINT2: `users/login`

# Title
Login a existed user by checking passsword we use bcrypt for password validation, we also have set a token in cookies.

### Method: POST

### Description:
This endpoint is used to login a new user. It accepts user email and password, and returns an authentication token along with the user details.

### Request.Body
- `email`: The email address of the user (required).
- `password`: The password for the user account (required).


## END POINT3: `users/profile`

# Title
this is our profile route, we have also use middleware in this. 

### Method: GET

### Description:
Anyone cannot access profile without login, so have checked using a middleware that the user is valid or not. we use jwt to verify
the user. 

### Request.Body
- `Token`: The token (required).

## END POINT4: `users/logout`

# Title
this is our logout route. 

### Method: GET

### Description:
To logout our user we remove the token from cookie. this is taking a another blacklisted token model.

### Request.Body
- `Token`: The token (required).

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

