import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./../config.json";

const googleAuth = (response) => {
  return new GoogleStrategy(
    config.strategies.google,
    (token, refreshToken, profile, done) => {
      return done(null, profile, response(
        200,
        "Google Authentication",
        { user: profile },
        { token, refreshToken }
      ));
    })
};

export default googleAuth;