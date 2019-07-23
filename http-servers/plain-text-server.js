import http from "http";

const hostname = '127.0.0.1';
const port = 3001;
http.createServer()
    .on('request', (req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("Hello World");
        res.end();
    })
    .listen(port, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });