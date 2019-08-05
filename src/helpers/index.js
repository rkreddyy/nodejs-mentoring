import * as users from './../data/users';

export const findUser = (username, password) => {
    return users.default.find(user => user.username === username && user.password === password);
}

export const formSuccessResponse = (user, token) => {
    return (
        200,
        "OK",
        { data: user },
        { token: token }
    )
}

export const formErrorResponse = (code, statusMessage, username, message) => {
    return (
        code,
        statusMessage,
        { data: username, message: statusMessage }
    )
}