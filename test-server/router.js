const fs = require('fs');
// const { endianness } = require('os');
exports.router = (req, res) =>{
    let url = req.url;
    if (url === '/index.html') {
        let resback = fs.readFileSync('./index.html')
        res.end(resback)
    } else {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            console.log('data.length', data.length)
            // res.end('hello');
        })
        req.on('finish', () => {
            console.log('finish')
        })
        req.on('readable', () => {
            console.log('read', req.read())
        })
    }   
}