import * as users from './../data/users';

export const findUser = (username, password) => {
    return users.default.find(user => user.username === username && user.password === password);
}

export const response = (code, message, data, token) => ({
    code, message, data, token
});