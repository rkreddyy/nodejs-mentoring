'use strict';

const User = require("../../../src/db/models_mongo/users");

const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    return res.send(users);
  });
}

const createUser = (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  User.create(
    { firstname, lastname, username, email, password },
    (err, user) => {
      if (err) return res.send(err);
      return res.send(user);
    });
}

const deleteUser = (req, res) => {
  const { id: _id } = req.params;
  User.deleteOne({ _id }, (err, success) => {
    if (err) res.send(err);
    return res.send("Deleted user successfully.")
  });
}

module.exports = {
  getUsers: getUsers,
  createUser: createUser,
  deleteUser: deleteUser
};