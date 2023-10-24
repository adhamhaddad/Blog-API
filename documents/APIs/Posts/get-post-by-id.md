# Routes

## GET /posts/{`id`}

Get post by ID.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "accept": "application/json",
    "access_token": "0c6e070d-07b8-4c38-b9db-8822e63566be"
}
```

### Request Params

1. `id` string - (`required`)

### Response

If the request is success, the server will respond with a status code of 200 and a JSON of post:

```json
{
  "id": "0c6e070d-07b8-4c38-b9db-8822e63566be",
  "title": "Post Title 1",
  "content": "Post Content 1",
  "createdBy": {
    "id": "0c6e070d-07b8-4c38-b9db-8822e63566be",
    "name": "Ahmed",
    "email": "ahmed@gmail.com"
  },
  "createdAt": "TIMESTAMP",
  "updatedAt": "TIMESTAMP"
}
```

### [Back to README](../../API.md#posts)
