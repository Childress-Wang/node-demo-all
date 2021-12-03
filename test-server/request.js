const {request} = require('http');

const options = {
    port: 3008,
    host: '127.0.0.1',
    method: 'POST',
    path: '/'
}
let data = ''
for(let i = 0; i < 65536 * 10 ; i++) {
    data += 'a';
}
let req = request(options);
req.setNoDelay(true);
req.flushHeaders();
req.write(data);
req.end()
console.log('执行了吗')
// req.on('close', ()=>{
//     console.log('结束')
// })