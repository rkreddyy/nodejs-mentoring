import { Strategy as FacebookStrategy } from "passport-facebook";
import config from "./../config.json";

const facebookAuth = (response) => {
  return new FacebookStrategy(
    config.strategies.facebook,
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile, response(
        200,
        "Facebook Authentication",
        { user: profile },
        { token: accessToken, refreshToken }
      ));
    });
};

export default facebookAuth;