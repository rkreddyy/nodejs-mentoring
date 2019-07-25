import querystring from 'querystring';

export default function queryParser(err, req, res, next) {
    if (err) throw err;

    let parsedUrl = url.parse(req.url);
    let parsedQS = querystring.parse(parsedUrl.query);

    req.parsedQuery = parsedQS;

    next();
}