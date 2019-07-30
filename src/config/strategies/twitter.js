import { Strategy as TwitterStrategy } from "passport-twitter";
import config from "./../config.json";

const twitterAuth = (response) => {
  return new TwitterStrategy(
    config.strategies.twitter,
    (token, tokenSecret, profile, done) => {
      return done(null, profile, response(
        200,
        "Twitter Authentication",
        { user: profile },
        { token, tokenSecret }
      ));
    })
};

export default twitterAuth;