import local from './local';
import facebook from './facebook';
import twitter from './twitter';
import google from './google';

export default function (passport) {
    console.log(local);
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    passport.use('local', local(response));
    passport.use('twitter', twitter(response));
    passport.use('facebook', facebook(response));
    passport.use('google', google(response));
}

const response = (code, message, data, token) => ({
    code, message, data, token
});