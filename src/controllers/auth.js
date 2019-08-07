import jwt from 'jsonwebtoken';
import passport from "passport";
import { findUser, response } from './../helpers'
import * as config from './../config/config.json';
import strategies from "../config/strategies";
import db from './../db/models';

strategies(passport);

export const auth = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    findUser(db, username, password)
        .then((user) => {
            if (user) {
                let token = jwt.sign(
                    { username: username },
                    config.jwt.secret,
                    { expiresIn: '24h' }
                );
                res.send(response(200, "OK", user, token));
            } else {
                res.status(404);
                return res.send(response(404, "Not found", "User Not Found"));
            }
        })
        .catch((err) => {
            res.status(500);
            return res.send(response(500, "Internal Server Error", err.body));
        });

}

export const passportAuth = (name) => (req, res) => {
    passport.authenticate(name, (err, user, info) => {
        if (err) {
            return res.send(err);
        }
        return res.send(info);
    })(req, res);
}