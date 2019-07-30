import jwt from 'jsonwebtoken';
import * as config from './../config/config.json';

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.jwt.secret, (err, decoded) => {
            if (err) {
                res.status(403);
                return res.json({
                    "code": 403,
                    "message": "Forbidden",
                    "data": {
                        "message": `Token is not valid`
                    }
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(404);
        return res.json(
            {
                "code": 404,
                "message": "Not Found",
                "data": {
                    "message": `Auth token is not supplied`
                }
            });
    }
};

export default checkToken;