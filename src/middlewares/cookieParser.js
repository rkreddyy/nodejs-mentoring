import app from './../app';

export default function parseCookies(err, req, res, next) {
    if (err) throw err;

    const cookies = req.headers.cookie;
    req.parsedCookies = parseStringToArray(cookies, ';');

    next();
}

function parseStringToArray(string, separator) {
    const list = {};

    string.split(separator).forEach((pair) => {
        const parts = pair.split('=');
        list[parts[0].trim()] = decodeURI(parts[1].join('='));
    });

    return list;
};