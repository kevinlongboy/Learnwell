# CONTENTS

## USER
### All endpoints that require authentication
### All endpoints that require proper authorization
### Get the Current User
### Log In a User
### Sign Up a User

## SUBJECTS
### Get all Subjects
### Get all Videos by a Subjects's ID

## VIDEOS
### Get all Videos
### Get all Videos of the current User
### Get details of a Video from an ID
### Create a Video
### Update a Video
### Delete a Video
### Get all Comments by a Video's ID
### Create a Comment for a Video based on the Video's ID

## VIDEOS
### Edit a Comment
### Delete a Comment



<!-- ************************************************************************ -->



# ROUTES

## USER

### All endpoints that require authentication
All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication

- Error Response: Require authentication
    - Status Code: 401
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Authentication required",
            "statusCode": 401,
        }
        ```
<br>


### All endpoints that require proper authorization
All endpoints that require authentication and the current user does not have the correct role(s) or permission(s).

- Request: endpoints that require proper authorization

- Error Response: Require proper authorization
    - Status Code: 403
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Forbidden",
            "statusCode": 403,
        }
        ```
<br>


### Get the Current User
Returns the information about the current user that is logged in.

- Require Authentication: true

- Request
    - Method: GET
    - URL: /api/session
    - Body: none

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "id": 1,
            "firstName": "Demo",
            "lastName": "User",
            "email": "Demo.User@email.com",
            "username": "DemoUser",
            "avatar": "file_location/url",
        }
        ```
<br>


### Log In a User
Logs in a current user with valid credentials and returns the current user's information.

-  Require Authentication: false

-  Request
    - Method: POST
    - URL: /api/session
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "credential": "Demo.User@email.com",
            "password": "Password123",
        }
        ```

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "id": 1,
            "firstName": "Demo",
            "lastName": "User",
            "email": "Demo.User@email.com",
            "username": "DemoUser",
            "avatar": "file_location/url",
            "token": "",
        }
        ```

- Error Response: Invalid credentials
    - Status Code: 401
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Invalid credentials",
            "statusCode": 401,
        }
        ```

- Error response: Body validation errors
    - Status Code: 400
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "credential": "Email or username is required",
                "password": "Password is required",
            },
        }
        ```
<br>


### Sign Up a User
Creates a new user, logs them in as the current user, and returns the current user's information.

- Require Authentication: false

- Request
    - Method: POST
    - URL: /api/users
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "firstName": "Demo",
            "lastName": "User",
            "email": "Demo.User@email.com",
            "username": "DemoUser",
            "password": "Password123",
            "avatar": "file_location/url",
        }
        ```

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "id": 1,
            "firstName": "Demo",
            "lastName": "User",
            "email": "Demo.User@email.com",
            "username": "DemoUser",
            "avatar": "file_location/url",
            "token": "",
        }
        ```

- Error response: User already exists with the specified email
    - Status Code: 403
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "User already exists",
            "statusCode": 403,
            "errors": {
                "email": "User with that email already exists"
            }
        }
        ```

- Error response: User already exists with the specified username
    - Status Code: 403
    - Headers:
        - Content-Type: application/json
    - Body:
    ```json
        {
            "message": "User already exists",
            "statusCode": 403,
            "errors": {
                "username": "User with that username already exists",
            },
        }
        ```

- Error response: Body validation errors
    - Status Code: 400
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "firstName": "First Name is required",
                "lastName": "Last Name is required",
                "username": "Username is required",
                "email": "Invalid email",
            },
        }
        ```
<br>
<br>



## SUBJECTS

### Get all Subjects
Returns all the Subjects.

- Require Authentication: false

- Request
    - Method: GET
    - URL: /api/subjects
    - Body: none

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "Subjects": [
                {
                    "id": 1,
                    "name": "Fine Arts 🎨",
                    "avatar": "file_location/url",
                }
            ]
        }
        ```
<br>


### Get all Videos by a Subjects's ID
Returns all the videos that belong to a Subject specified by ID.

- Require Authentication: false

- Request
    - Method: GET
    - URL: /api/subject/:subjectId/videos
    - Body: none

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
        "Videos": [
            {
                "id": 1,
                "name": "Fine Arts 🎨",
                "avatar": "file_location/url",
                "Videos": [
                    {
                        "id": 1,
                        "userId": 1,
                        "subjectId": 1,
                        "title": "Video Title",
                        "description": "Video description...",
                        "url": "https://",
                        "numComments": 1,
                        "createdAt": "2024-07-01 00:00:00",
                        "updatedAt": "2024-07-01 00:00:00",
                        "User": {
                            "id": 1,
                            "firstName": "Demo",
                            "lastName": "User",
                            "username": "DemoUser",
                            "avatar": "file_location/url",
                        },
                    }
                ]
            }
        ]
        }
        ```
<br>
<br>



## VIDEOS

### Get all Videos
Returns all the videos.

- Require Authentication: true

- Request
    - Method: GET
    - URL: /api/videos
    - Body: none

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "Videos": [
                {
                    "id": 1,
                    "userId": 1,
                    "subjectId": 1,
                    "title": "Video Title",
                    "description": "Video description...",
                    "url": "https://",
                    "numComments": 1,
                    "createdAt": "2024-07-01 00:00:00",
                    "updatedAt": "2024-07-01 00:00:00",
                    "Subject": {
                        "id": 1,
                        "name": "Fine Arts 🎨",
                        "avatar": "file_location/url",
                    },
                    "User": {
                        "id": 1,
                        "firstName": "Demo",
                        "lastName": "User",
                        "username": "DemoUser",
                        "avatar": "file_location/url",
                    },
                },
            ]
        }
        ```
<br>


### Get all Videos of the current User
Returns all the videos created by the current User.

- Require Authentication: true

- Request
    - Method: GET
    - URL: /api/videos/current
    - Body: none

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "Videos": [
                {
                    "id": 1,
                    "userId": 1,
                    "subjectId": 1,
                    "title": "Video Title",
                    "description": "Video description...",
                    "url": "https://",
                    "numComments": 1,
                    "createdAt": "2024-07-01 00:00:00",
                    "updatedAt": "2024-07-01 00:00:00",
                    "Subject": {
                        "id": 1,
                        "name": "Fine Arts 🎨",
                        "avatar": "file_location/url",
                    },
                },
            ]
        }
        ```
<br>


### Get details of a Video from an ID
Returns the details of a Video specified by its ID.

- Require Authentication: false

- Request
    - Method: GET
    - URL: /api/videos/:videoId
    - Body: none

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "id": 1,
            "userId": 1,
            "subjectId": 1,
            "title": "Video Title",
            "description": "Video description...",
            "url": "https://",
            "numComments": 1,
            "createdAt": "2024-07-01 00:00:00",
            "updatedAt": "2024-07-01 00:00:00",
            "User": {
                "id": 1,
                "firstName": "Demo",
                "lastName": "User",
                "username": "DemoUser",
                "avatar": "file_location/url",
            },
            "Subject": {
                "id": 1,
                "name": "Fine Arts 🎨",
                "avatar": "file_location/url",
            },
        }
        ```

- Error response: Couldn't find a Video with the specified ID
    - Status Code: 404
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Video couldn't be found",
            "statusCode": 404
        }
        ```
<br>


### Create a Video
Creates and returns a new video.

- Require Authentication: true

- Request
    - Method: POST
    - URL: /api/videos
    - Body: none
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "title": "Video Title",
            "length": "5:44",
            "description": "Video description...",
            "subjectId": "1",
            "url": "https://",
        }
        ```

- Successful Response
    - Status Code: 201
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "id": 1,
            "userId": 1,
            "subjectId": 1,
            "title": "Video Title",
            "description": "Video description...",
            "url": "https://",
            "numComments": 1,
            "createdAt": "2024-07-01 00:00:00",
            "updatedAt": "2024-07-01 00:00:00",
        }
        ```
    
- Error response: Body validation error
    - Status Code: 400
    - Headers:
        - Content-Type: application/json
    - Body:
    ```json
    {
        "message": "Validation Error",
        "statusCode": 422,
        "errors": {
            "title": "Title is required",
            "url": "URL is required",
            "subject": "Subject is required",
            "description": "Video description is required",
        }
    }
    ```
<br>


### Update a Video
Updates and returns an existing video.

- Require Authentication: true

- Request
    - Method: PUT
    - URL: /api/videos/:videoId
    - Body: none
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "title": "Video Title",
            "length": "5:44",
            "url": "https://",
            "description": "Video description...",
            "subjectId": "1",
        }
        ```

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
  - Body:
        ```json
        {
            "id": 1,
            "userId": 1,
            "subjectId": 1,
            "title": "Video Title",
            "description": "Video description...",
            "url": "https://",
            "numComments": 1,
            "createdAt": "2024-07-01 00:00:00",
            "updatedAt": "2024-07-01 00:00:00",
        }
    ```

- Error response: Body validation error
  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
        "message": "Validation Error",
        "statusCode": 422,
        "errors": {
            "title": "Title is required",
            "url": "URL is required",
            "description": "Description is required",
            "subjectId": "Subject is required",
        }
    }
    ```

- Error response: Couldn't find a Video with specified ID
    - Status Code: 404
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Video couldn't be found",
            "statusCode": 404
        }
        ```
<br>


### Delete a Video
Deletes an existing video.

- Require Authentication: true
- Require proper authorization: Video must belong to the current User

- Request
    - Method: DELETE
    - URL: /api/videos/:videoId
    - Body: none
    - Headers:
        - Content-Type: application/json
    - Body: none

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
  - Body: none

- Error response: Couldn't find a Video with specified ID
    - Status Code: 404
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Video couldn't be found",
            "statusCode": 404
        }
        ```
<br>


### Get all Comments by a Video's ID
Returns all the comments that belong to a Video specified by ID.

- Require Authentication: false

- Request
    - Method: GET
    - URL: /api/videos/:videoId/comments
    - Body: none

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "Comments": [
                {
                    "id": 1,
                    "comment": "Sample comment",
                    "createdAt": "2024-07-01 00:00:00",
                    "updatedAt": "2024-07-01 00:00:00",
                    "User": {
                        "id": 1,
                        "firstName": "Demo",
                        "lastName": "User",
                        "username": "DemoUser",
                        "avatar": "file_location/url",
                    },
                }
            ]
        }
        ```

- Error response: Couldn't find a Video with the specified ID
    - Status Code: 404
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Video couldn't be found",
            "statusCode": 404
        }
        ```
<br>

### Create a Comment for a Video based on the Video's ID
Create and return a new comment for a Video specified by ID.

- Require Authentication: true

- Request
    - Method: POST
    - URL: /api/videos/:videoId/comments
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "comment": "Sample comment",
        }
        ```

- Successful Response
    - Status Code: 201
    - Headers:
        - Content-Type: application/json
    - Body:
    ```json
    {
        "id": 1,
        "userId": 1,
        "videoId": 1,
        "comment": "Sample comment",
        "createdAt": "2024-07-01 00:00:00",
        "updatedAt": "2024-07-01 00:00:00",
    }
    ```

- Error Response: Body validation errors
    - Status Code: 400
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "comment": "Comment is required",
            }
        }
        ```

- Error response: Couldn't find a Video with the specified ID
    - Status Code: 404
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Video couldn't be found",
            "statusCode": 404
        }
        ```
<br>
<br>



## COMMENTS

### Edit a Comment
Update and return an existing Comment.

- Require Authentication: true
- Require proper authorization: Comment must belong to the current User

- Request
    - Method: PUT
    - URL: /api/comments/:commentId
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "comment": "Sample comment",
        }
        ```

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "id": 1,
            "userId": 1,
            "videoId": 1,
            "comment": "Sample comment",
            "createdAt": "2024-07-01 00:00:00",
            "updatedAt": "2024-07-01 00:00:00",
        }
        ```

- Error Response: Body validation errors
    - Status Code: 400
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "comment": "Comment is required",
            }
        }
        ```

- Error Response: Couldn't find a Comment with the specified ID
    - Status Code: 404
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Comment couldn't be found",
            "statusCode": 404,
        }
        ```
<br>


### Delete a Comment
Delete an existing comment.

- Require Authentication: true
- Require proper authorization: Comment must belong to the current User

- Request
    - Method: DELETE
    - URL: /api/comments/:commentId
    - Body: none

- Successful Response
    - Status Code: 200
    - Headers:
        - Content-Type: application/json
    - Body:
        ```json
        {
            "message": "Comment successfully deleted",
            "statusCode": 200
        }
        ```

- Error response: Couldn't find a Comment with the specified ID
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
        "message": "Comment couldn't be found",
        "statusCode": 404
    }
    ```