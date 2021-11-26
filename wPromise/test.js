const Promise = require('./index');

let p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(200)
    },3000)
}).then((res)=>{
    console.log('res', res);
    return new Promise((resolve,reject)=> {
        setTimeout(()=>{
            reject(333)
            // resolve(333)
        }, 1000)
    })
},(err)=>{
    console.log('err', err)
}).then((res2)=>{
    console.log('res2', res2);
},(err)=>{
    console.log('err2', err)
})
