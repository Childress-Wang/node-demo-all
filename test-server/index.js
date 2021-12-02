const http = require('http');

let server = http.createServer((req, res) => {
    let data = '';
    req.on('data', (chunk)=>{
        data+=chunk;
        console.log('chunk', chunk);
        console.log('chunk.size', chunk.length);
    });
    req.on('end', () => {
        console.log('data',data);
        console.log('data.length',data);
    })
});

server.listen(3008, () => {
    console.log('server is listening 3008')
})