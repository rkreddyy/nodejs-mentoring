import User from './../db/models_mongo/users';

export const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    return res.send(users);
  });
}

export const createUser = (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  User.create(
    { firstname, lastname, username, email, password },
    (err, user) => {
      if (err) return res.send(err);
      return res.send(user);
    });
}

export const deleteUser = (req, res) => {
  const { id: _id } = req.params;
  User.deleteOne({ _id }, (err, success) => {
    if (err) res.send(err);
    return res.send("Deleted user successfully.")
  });
}