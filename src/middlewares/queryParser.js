import querystring from 'querystring';
import url from "url";

const queryParser = (req, res, next) => {

    let parsedUrl = url.parse(req.url);
    let parsedQS = querystring.parse(parsedUrl.query);

    req.parsedQuery = parsedQS;

    next();
};

export default queryParser;