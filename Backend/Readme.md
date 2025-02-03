{
  "endpoint": "POST /users/register",
  "requestBody": {
    "fullName": {
      "firstName": "string", 
      "lastName": "string" 
    },
    "email": "string",
    "password": "string"
  },
  "validationAndSecurity": {
    "validation": {
      "firstName": "Required, trimmed, non-empty string",
      "lastName": "Required, trimmed, non-empty string",
      "email": "Required, valid email format, unique",
      "password": "Must meet security criteria"
    },
    "security": {
      "jwtAuthentication": "JWT is used for authentication and authorization",
      "passwordEncryption": "Password is hashed using bcrypt before storing"
    }
  },
  "responses": {
    "success": {
      "status": 201,
      "body": {
        { user, token }
        "user": {
          "id": "unique_user_id",
          "fullName": {
            "firstName": "string",
            "lastName": "string"
          },
          "email": "string"
        }
      }
    },
    "errors": {
      "badRequest": {
        "status": 500,
        "body": { "error": "error.message" 
        }
      },
    }
  },
  "notes": [
    "bcrypt is properly implemented for password hashing",
    "JWT has used for tokengeneration",
  ]
}
