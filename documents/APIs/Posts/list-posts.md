# Routes

## GET /posts/

Get all posts.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "accept": "application/json",
    "access_token": "0c6e070d-07b8-4c38-b9db-8822e63566be"
}
```

### Request Query Params

1. `user_id`=string - (`optional`)

### Response

If the request is success, the server will respond with a status code of 200 and a JSON Array of posts:

```json
{
  "data": [
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
    },
    {
      "id": "0c6e070d-07b8-4c38-b9db-8822e63566be",
      "title": "Post Title 2",
      "content": "Post Content 2",
      "createdBy": {
        "id": "0c6e070d-07b8-4c38-b9db-8822e63566be",
        "name": "Adham",
        "email": "adham@gmail.com"
      },
      "createdAt": "TIMESTAMP",
      "updatedAt": "TIMESTAMP"
    },
    {
      "id": "0c6e070d-07b8-4c38-b9db-8822e63566be",
      "title": "Post Title 3",
      "content": "Post Content 3",
      "createdBy": {
        "id": "0c6e070d-07b8-4c38-b9db-8822e63566be",
        "name": "Mohamed",
        "email": "mohamed@gmail.com"
      },
      "createdAt": "TIMESTAMP",
      "updatedAt": "TIMESTAMP"
    }
  ],
  "total": 3
}
```

### [Back to README](../../API.md#posts)
