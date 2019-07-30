import { Strategy as LocalStrategy } from "passport-local";
import { findUser } from './../../helpers';

const localAuth = (response) => {
  return new LocalStrategy(
    function (username, password, done) {
      let user = findUser(username, password);
      if (!user || username !== user.username || password !== user.password) {
        return done(response(404, "Invalid Credentials", "Invalid Credentials"))
      }
      return done(null, user, response(200, "OK", user));
    });
}

export default localAuth;