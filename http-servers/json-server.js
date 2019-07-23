import http from "http";
import { Readable } from "stream";

const hostname = '127.0.0.1';
const port = 3003;
const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
};


const server = http.createServer();
server.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    const inStream = new Readable({
        read() { }
    });
    inStream.push(JSON.stringify(product));
    inStream.push(null);

    inStream.pipe(res);
})
server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});