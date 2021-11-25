const Promise = require('./index');

let p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(200)
    },5000)
}).then((res)=>{
    console.log('res', res)
})
console.log(Promise)