# REST-api for Angular course in SoftUni


## Base URL

The Base URL for the API is:

http://localhost:3000/api


## Authentication
This API isn't open API. Authentication is required to store and get data. 

# Endpoints: Users

* http://localhost:3000/api/users/register -- signing up;
* http://localhost:3000/api/users/login -- signing in;
* http://localhost:3000/api/users/logout -- logging out;

## Register User
Signs up user and returns the registered data as json.

### URL --> http://localhost:3000/api/users/register

### Method --> ```POST```

### Body -->

```
{
    "name":"John Doe",
    "email":"john@email.com",
    "username":"Johny",
    "password":"12345",
    "rePassword":"12345"
}
```

Required:

```email``` : [string] -- The email of the person is required and must be unique;

```username``` : [string] -- The username of the person is required and must be unique, also there is a minimum length of 3 chars, allowed are latin letters and numbers;

```password``` : [string] -- The password of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

Not Required

```tel``` : [string] -- Optional;

### Success Response:

Code: 200

Content: 
``` 
{
    "themes": [],
    "posts": [],
    "_id": "5f1875690916010017964978",
    "name": "John Doe",
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 409 CONFLICT

Content: 
```
{
    "message": "This email/username is already registered!"
}
```

## Login User
Signs in user and returns the registered data as json.

### URL --> https://localhost:3000/api/users/login

### Method --> ```POST```

### Body -->

```
{
    "username":"Johny",
    "password":"12345"
}
```

Required:

```username``` : [string] -- The username of the person 

```password``` : [string] -- The password of the person 

### Success Response:

Code: 200

Content: 
``` 
{
    "themes": ["5f85c51996b5601b2406e5b7"],
    "posts": ["5f86bdcde012743fe4f5b324"],
    "_id": "5f1875690916010017964978",
    "name": "John Doe",
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{ 
    "message": "Wrong username or password"
}
```

## Logout User
Logout user.

### URL --> http://localhost:3000/api/users/logout```

### Method --> ```POST```

### Success Response:

Code: 401 Unauthorized

Content: 
``` 
{ 
    "message": "Logged out!"
}
```

# Endpoints: Themes

* http://localhost:3000/api/themes
* http://localhost:3000/api/themes/:themeId

## Get Themes
Returns all themes as json.

### URL --> http://localhost:3000/api/themes

### Method --> ```GET```

### Success Response:

Code: 200

Content: 
``` 
[
    {
    
        "posts": ["5f858dd2d895ad23602db9d5"],
        "_id": "5f858dd2d895ad23602db9d4",
        "themeName": "Some Theme",
        "userId": "5f8580d25d1da62568dd38fd",
        "created_at": "2020-10-13T11:21:54.863Z",
        "updatedAt": "2020-10-13T11:21:54.898Z",
        "__v": 0
    }
]
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Post Theme
Creates new Theme with the first post of the author and returns the theme as json.

### URL --> http://localhost:3000/api/themes```

### Method --> ```POST```

### Body -->

```
{
    "themeName": "Some Theme Title",
    "postText": "Some Post text"
}
```

Required:

```themeName``` : [string] -- The Title of your new Theme, which you want to create
```postText``` : [string] -- The text of your post. This post will be append as first comment on your Theme.

### Success Response:

Code: 200

Content: 
``` 
{

    "posts": ["5f86c38abfa44331a0ff0094"],
    "_id": "5f86c38abfa44331a0ff0093",
    "themeName": "Some Theme Title",
    "userId": "5f86c1f0a112c130e89964af",
    "created_at": "2020-10-14T09:23:22.102Z",
    "updatedAt": "2020-10-14T09:23:22.114Z",
    "__v": 0
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Create Post
Creates new Post of the author and returns the theme as json.

### URL --> https://localhost:3000/api/themes/:themeId

### Method --> ```POST```

### Body -->

```
{
    "postText": "Some Post text"
}
```

### Success Response:

Code: 200

Content: 
``` 
{

"posts": [
    "5f85ad8f1141b13a04a9139c",
    "5f85b2501141b13a04a9139d"
],
"_id": "5f858dd2d895ad23602db9d4",
"themeName": "Some Theme",
"userId": "5f8580d25d1da62568dd38fd",
"created_at": "2020-10-13T11:21:54.863Z",
"updatedAt": "2020-10-13T13:57:36.466Z",
"__v": 0
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

# Endpoints: Posts

* ```/themes/:themeId/posts/:postId```

## Edit Post
Edit Post if the user is the author of the post and returns the changed post.

### URL --> https://localhost:3000/api/themes/:themeId/posts/:postId

### Method --> ```PUT```

### Body -->

```
{
    "postText": "Changed text"
}
```

### Success Response:

Code: 200

Content: 
``` 
{
    "likes": [],
    "_id": "5f86c3fcbfa44331a0ff0095",
    "text": "Changed text",
    "userId": "5f86c1f0a112c130e89964af",
    "themeId": "5f85c51996b5601b2406e5b7",
    "created_at": "2020-10-14T09:25:16.203Z",
    "updatedAt": "2020-10-14T09:31:45.021Z",
    "__v": 0
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{
    message: "Not allowed!"
}
```

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Delete Post
Deletes Post if the user is the author of the post and returns the deleted post.

### URL --> ```/themes/:themeId/posts/:postId```

### Method --> ```DELETE```

### Success Response:

Code: 200

Content: 
``` 
{
    "likes": [],
    "_id": "5f86c3fcbfa44331a0ff0095",
    "text": "Changed text",
    "userId": "5f86c1f0a112c130e89964af",
    "themeId": "5f85c51996b5601b2406e5b7",
    "created_at": "2020-10-14T09:25:16.203Z",
    "updatedAt": "2020-10-14T09:33:56.595Z",
    "__v": 0
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{
    message: "Not allowed!"
}
```

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```
## Like Post
Adds like to the post.

### URL --> ```/likes/:postId```

### Method --> ```PUT```

### Success Response:

Code: 200

Content: 
``` 
{
    message: "Liked successful!"
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```




<!-- users
.post /register - register new user
.post /login - login user
.post /logout - logout user

.get /profile - get user info
.post /profile - post user info
.put /profile - edit user info

themes
.get /themes - lists all themes
.post /themes - create new theme only for registered users

posts:
.get themes/id - get all posts for theme
.post themes/id - create post in theme by id only for registered users
.put themes/id/posts/id - edit post only possible for author
.delete themes/id/posts/id - delete post only possible for author -->


<!-- http://localhost:3000/api/users/register --  {"name":"SomeName","email":"some@email.com","username":"someUsername","password":"12345","rePassword":"12345"} -->
<!--http://localhost:3000/api/themes -- {"themeName":"Some Theme", "userId":"5f85bf709a517d36f4abe656", "post": "Some Post" } -->
<!-- http://localhost:3000/api/themes/5f858dd2d895ad23602db9d4  -- {"userId":"5f8580d25d1da62568dd38fd", "postText": "Some Post textsdfasdf" } -->
