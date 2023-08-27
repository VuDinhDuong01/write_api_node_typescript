# THÔNG TIN API

## Base URL
The base URL for the API is: `http:localhost:5000/api` .Đối với các router trả về cần xác thực thì cần => gửi token lên headers với key `authentication`. token phải bắt đầu bằng `Bearer`

## Format response data
```json
{
  "message":"string",
  "data"?:"any"
}
```

## Format response error
### đối với lỗi do nhập form hay lỗi do url 
```json
{
  "message":"string" ,
  "data":{
    "email":"string"
  }
}

```

### đối với lỗi khác như xác thực 
```json
{
  "message":"string"
}
```
### Register: /auth/register
**Method:** `POST` body

**Request:**
```json
{
  "email":"duong2lophot@gmail.com",
  "name":"vũ đình dương",
  "password":"Anhyeuem123@",
  "confirmPassword":"Anhyeuem123@",
  "date_of_birth":"2001-02-3",

}
```
**Rule** 

- name: required , lenght:6-12 ký tự
- email: required
- password: required, lenght:6-20 ký tự, phải có ít nhất 1 ký tự hoa, 1 ký tự thường , 1 số và 1 ký tự đặc biệt
- confirmPassword: save password
- date_of_brith: required ISO 8601
**Response**
```json
{
    "message": "register successfully",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlOWFlY2MzNGJjZWQ2ZWU0NGY3MmU3IiwiaWF0IjoxNjkzMDM2MjM2LCJleHAiOjE2OTMyMDkwMzZ9._HWHx1kmJ-NmVkndtL4AlzQQGVOt1rYFYQOK__znOkA",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlOWFlY2MzNGJjZWQ2ZWU0NGY3MmU3IiwiaWF0IjoxNjkzMDM2MjM2LCJleHAiOjE2OTM2NDEwMzZ9.TZgJTS84-HsfxHfWXULL9p5_mP5glQZRWfXVBI1iYRo",
        "user": {
            "_id": "64e9aecc34bced6ee44f72e7",
            "name": "long ma túy",
            "email": "longmatuy@gmail.com",
            "bio": "",
            "created_at": "2023-08-26T06:59:08.372Z",
            "password": "4a9feb5c5f79a635299592d779740ae5c739d93b93d89a853eb367c1b1175d16",
           
            "username": "long ma túy",
            "website": "",
            "avatar": "",
            "updated_at": "2023-08-26T06:59:08.372Z",
            "date_of_birth": "2022-01-23T00:00:00.000Z",
            "__v": 0
        }
    }
}
```


### Login: /auth/login
**Method:** `POST` body
**Request**
```json
{
  "email":"duong2lophot@gmail.com",
  "password":"Anhyeuem123!!"
}
```
**Rule**
- email: required ,
- password: required ,lenght: 6-20 ký tự , có ít nhất 1 ký tự hoa, 1 ký tự thường , 1 ký tự số và 1 ký tự đặc biệt 

**Response**

```json
{
    "message": "login successfully",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlOWFlY2MzNGJjZWQ2ZWU0NGY3MmU3IiwiaWF0IjoxNjkzMDM2NzQ4LCJleHAiOjE2OTM2NDE1NDh9.kaVczkZ40iYZyIaaXASBZlEJhR4a4VURDkoBNSct6rU",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlOWFlY2MzNGJjZWQ2ZWU0NGY3MmU3IiwiaWF0IjoxNjkzMDM2NzQ4LCJleHAiOjE2OTM2NDE1NDh9.3V9Bhvn6g4-aZXTu6EJHBAdlHS040WHdMwSXR3oEZiw",
        "user": {
            "_id": "64e9aecc34bced6ee44f72e7",
            "name": "long ma túy",
            "email": "longmatuy@gmail.com",
            "bio": "",
            "created_at": "2023-08-26T06:59:08.372Z",
            "password": "4a9feb5c5f79a635299592d779740ae5c739d93b93d89a853eb367c1b1175d16",
            "username": "long ma túy",
            "website": "",
            "avatar": "",
            "updated_at": "2023-08-26T06:59:08.372Z",
            "date_of_birth": "2022-01-23T00:00:00.000Z",
            "__v": 0
        }
    }
}
```
### Logout : /auth/logout
**Method:** `POST` body
- Authorization : Bearer `access_token`
**Response:** 
```json
{
    "messsage": "logout successfully"
}
```

### Refresh_token : /auth/refresh_token
**Method:** `POST` body
**Request**
```json
{
  "refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlNzk0NmQ3MWE5YmUxYmI3Y2JjNjk4IiwiaWF0IjoxNjkyODk4NDE4LCJleHAiOjE2OTM1MDMyMTh9.5TdC0Egb-56NDLcK8XFZCVIVKyH6V3k-cSxYP_HjB3w"
}
```
**Response**
```json
{
    "message": "refresh token successfully",
    "result": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlYTA4ODU1MGIwOTVlMWI4ZjFjZDBjIiwiaWF0IjoxNjkzMDU5NDE1LCJleHAiOjE2OTMyMzIyMTV9.VdWEt-ceFIOTT3FAuDD9GlAvqhOYIeEUeT0WCcvlvs0",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlYTA4ODU1MGIwOTVlMWI4ZjFjZDBjIiwiaWF0IjoxNjkzMDU5NDE1LCJleHAiOjE2OTM2NjQyMTV9.kcaYScc3_Sma4ji4d8V3tFJEVS-t-sQmklLAlqC-OcY"
    }
}
```
### Verify email lúc đăng ký : /auth/verify_email
**Method** `POST`
**Request** body
```json
{
    "email_token_verify":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlODBmNDBlYzUyODg2NDNjOGU5ZGQ0IiwiaWF0IjoxNjkyOTI5ODU2LCJleHAiOjE2OTM3OTM4NTZ9.zicoipYLYAkWwKpKkTTZKaz-uTI3Fl3LnF5Lf4xQmrA"
}
```

**Response**
```json
{
    "message": "bạn đã xác thực tài khoản thành công"
}
```
### Forgot password: /auth/forgot_password
**Method:** `POST`
**Request:** body
```json
{
  "email":"duong2lophot@gmail.com"
}
```
**Response** 
```json
{
    "message": "bạn kiểm tra email để verify"
}
```

### verify forgot password : /auth/verify_forgot_password
**Method:** `POST`
**Request** body
```json
{
    "fotgot_password_verify":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlODBmNDBlYzUyODg2NDNjOGU5ZGQ0IiwiaWF0IjoxNjkyOTMyMTcyLCJleHAiOjE2OTMxMDQ5NzJ9.XIqaHkabnIL73pdGsYGiNQqmXf39mvmIkTkECBfFSW"
}
```
**Response**
```json
{
    "message": "bạn đã verify thành công"
}
```

### Reset password :/auth/reset_password/:user_id
**Method** `POST`
**Request** 
- body
```json
{
    "password":"Anhyeuem999999!",
    "confirmPassword":"Anhyeuem999999!"
}
```
- params :"user_id=?"
--  truyền user_id người cần reset_password

**Response** 
```json
{
    "message": "bạn đã đổi mật khẩu thành công"
}
```
### Get me: /auth/me
**Method:** `GET`
- Authorization : Bearer `access_token`
**Response:** 
```json
{
    "message": "lấy thông tin thành công",
    "data": {
        "_id": "64e9aecc34bced6ee44f72e7",
        "name": "long ma túy",
        "email": "longmatuy@gmail.com",
        "bio": "",
        "created_at": "2023-08-26T06:59:08.372Z",
        "password": "4a9feb5c5f79a635299592d779740ae5c739d93b93d89a853eb367c1b1175d16",
        "username": "long ma túy",
        "website": "",
        "avatar": "",
        "updated_at": "2023-08-26T06:59:08.372Z",
        "date_of_birth": "2022-01-23T00:00:00.000Z",
       
        "__v": 0
    }
}
```
### change_password: /auth/change_password
**Method:**  `PUT`
**Request:** body
```json
{
  "passwordOld":"Anhyeuem123!",
  "passwordNew":"Anhyeuem1234@",
  "confirmPasswordNew":"Anhyeuem1234@"
}
```
**Response**

```json
{
  "message":"bạn thay đổi mật khẩu thành công"
}
```
### GET profile friend: /auth/profile/:user_id

**Method:** `GET`
**Request:** params "user_id=?"
- Authorization : Bearer `access_token`
**Response**
```json
{
    "message": "lấy thông tin bạn bè thành công",
    "data": {
        "_id": "64ea088550b095e1b8f1cd0c",
        "name": "long ma túy",
        "email": "longmatuy@gmail.com",
        "bio": "",
        "created_at": "2023-08-26T14:13:09.361Z",
        "username": "long ma túy",
        "website": "",
        "avatar": "",
        "updated_at": "2023-08-26T14:27:33.585Z",
        "date_of_birth": "2022-01-23T00:00:00.000Z",
        "__v": 0
    }
}
```

### Follower : /auth/follower/:user_id
**Method** `POST`
**Request** params: "user_id=?"
- Authorization : Bearer `access_token`
**Response** 
```json
{
    "message": "bạn đã follow người khác thành công",
    "data": {
        "user_id_follower": "64ea088550b095e1b8f1cd0c",
        "user_id_followed": "64ea088550b095e1b8f1cd0c",
        "created_at": "2023-08-26T14:53:35.813Z",
        "updated_at": "2023-08-26T14:53:35.813Z",
        "_id": "64ea121001e219011f852a3d",
        "__v": 0
    }
}
```

### change Account : /auth/change_account
**Method:** `PUT`
- Authorization : Bearer `access_token`
**Request:**  body

```json
{
    "name":"kakak",
    "website":"fdkfdfdkfdkf",
    "bio":"https://tse4.mm.bing.net/th?id=OIP.fzSnClvueUiDCZNJINMWywHaEK&pid=Api&P=0&h=180",
    "avatar":"https://tse4.mm.bing.net/th?id=OIP.fzSnClvueUiDCZNJINMWywHaEK&pid=Api&P=0&h=180",
    "date_of_birth":"2022-02-23"
}
```

**Response**
```json
{
    "message": "thay đổi tài khoản thành công",
    "data": {
        "_id": "64ea088550b095e1b8f1cd0c",
        "name": "kakak",
        "email": "longmatuy@gmail.com",
        "bio": "https://tse4.mm.bing.net/th?id=OIP.fzSnClvueUiDCZNJINMWywHaEK&pid=Api&P=0&h=180",
        "created_at": "2023-08-26T14:13:09.361Z",
        "password": "4a9feb5c5f79a635299592d779740ae5c739d93b93d89a853eb367c1b1175d16",
        "username": "kakak",
        "website": "fdkfdfdkfdkf",
        "avatar": "https://tse4.mm.bing.net/th?id=OIP.fzSnClvueUiDCZNJINMWywHaEK&pid=Api&P=0&h=180",
        "updated_at": "2023-08-26T14:59:14.236Z",
        "date_of_birth": "2022-02-23T00:00:00.000Z",
        "__v": 0
    }
}
```