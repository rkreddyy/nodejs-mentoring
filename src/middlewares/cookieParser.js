const CookieParser = (req, res, next) => {
    // if cookie is not present, add one cookie
    if (req.headers.cookie === undefined) {
        req.headers.cookie = 'username=John Doe; expires=Thu, 18 Dec 2019 12:00:00 UTC';
    }
    req.parsedCookies = parseCookie(req.headers.cookie);
    console.log(`COOKIE PARSER: ${JSON.stringify(req.parsedCookies)}`);

    next();
};

function parseCookie(cookie, separator) {
    let output = {};
    cookie.split(/\s*;\s*/).forEach(function (pair) {
        pair = pair.split(/\s*=\s*/);
        output[pair[0]] = pair.splice(1).join('=');
    });

    return output;
};

export default CookieParser;