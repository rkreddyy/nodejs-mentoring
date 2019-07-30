import * as users from './../data/users';

export const findUser = (username, password) => {
    return users.default.find(user => user.username === username && user.password === password);
}

export const formSuccessResponse = (user, token) => {
    return {
        "code": 200,
        "message": "OK",
        "data": {
            "user": {
                "email": user.email,
                "username": user.username
            }
        },
        "token": token
    }
}

export const formErrorResponse = (code, message, username, details) => {
    return {
        "code": code,
        "message": message,
        "data": {
            "user": username,
            "message": details
        }
    }
}