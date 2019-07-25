import http from "http";
import path from "path";
import fs from "fs";
import { Readable } from "stream";

const hostname = '127.0.0.1';
const port = 3001;
const htmlFilePath = path.join(__dirname, 'index.html');


const server = http.createServer();
server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    let data = fs.readFileSync(htmlFilePath, { encoding: 'utf-8' });
    const htmlData = data.toString().replace("{message}​", "This is a real message text");

    const inStream = new Readable({
        read() { }
    });
    inStream.push(htmlData);
    inStream.push(null);

    inStream.pipe(res);
})
server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});