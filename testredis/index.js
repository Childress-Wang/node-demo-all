const redis = require('redis');
const client = redis.createClient();
client.on('connect', ()=>{
    console.log('redis连接成功');
})
client.on('error', (err) => {
    console.log('err', err)
})

client.set("key", "value");
// client.get("key", redis.print);
client.get("key",(err, res)=>{
    console.log('res', res)
})