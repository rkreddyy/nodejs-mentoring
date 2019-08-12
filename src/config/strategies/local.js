import { Strategy as LocalStrategy } from "passport-local";
import { findUser } from './../../helpers';
import db from './../../db/models';

const localAuth = (response) => {
  return new LocalStrategy(
    function (username, password, done) {
      findUser(db, username, password)
        .then((user) => {
          return user ?
            done(null, user, response(200, "OK", user)) :
            done(response(404, "Invalid Credentials", "Invalid Credentials"));
        })
        .catch((err) => {
          res.status(500);
          return res.send(response(500, "Internal Server Error", err.body));
        });
    });
}

export default localAuth;