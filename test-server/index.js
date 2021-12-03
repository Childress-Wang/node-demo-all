const http = require('http');
const {router} = require('./router')
let server = http.createServer((req, res) => {
    router(req, res);
});

server.listen(3008, () => {
    console.log('server is listening 3008')
})