import * as users from './../data/users';

export const getAllUsers = (req, res) => {
    return res.send(users.default);
}