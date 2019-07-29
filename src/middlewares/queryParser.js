import querystring from 'querystring';
import url from "url";

const queryParser = (req, res, next) => {

    let parsedUrl = url.parse(req.url);
    let parsedQS = querystring.parse(parsedUrl.query);

    req.parsedQuery = parsedQS;
    console.log(`QUERY PARSER: ${JSON.stringify(parsedQS)}`);

    next();
};

export default queryParser;