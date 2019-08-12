import db from './../db/models';

export const getAllUsers = (req, res) => {
    return db.User.findAll()
        .then(users => {
            return res.json(users);
        })
        .catch(err => res.send(err));
}