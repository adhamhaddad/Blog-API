# Routes

## GET /users/{`id`}

Get users by ID.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "accept": "application/json",
    "access_token": "0c6e070d-07b8-4c38-b9db-8822e63566be"
}
```

### Response

If the request is success, the server will respond with a status code of 200 and a JSON of user:

```json
{
  "id": "0c6e070d-07b8-4c38-b9db-8822e63566be",
  "name": "Ahmed",
  "email": "ahmed@gmail.com"
}
```

### [Back to README](../../API.md#users)
