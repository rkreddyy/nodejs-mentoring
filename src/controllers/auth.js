import jwt from 'jsonwebtoken';
import passport from "passport";
import { findUser, response } from './../helpers'
import * as config from './../config/config.json';
import strategies from "../config/strategies";

strategies(passport);

export const auth = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let user = findUser(username, password);
    if (user) {
        if (username === user.username && password === user.password) {
            let token = jwt.sign(
                { username: username },
                config.jwt.secret,
                { expiresIn: '24h' }
            );
            res.send(response(200, "OK", user, token));
        } else {
            res.status(403);
            res.send(response(403, "Forbidden", "Incorrect username or password"));
        }
    } else {
        res.status(404);
        return res.send(response(404, "Not found", "User Not Found"));
    }
}

export const passportAuth = (name) => (req, res) => {
    passport.authenticate(name, (err, user, info) => {
        if (err) {
            return res.send(err);
        }
        return res.send(info);
    })(req, res);
}