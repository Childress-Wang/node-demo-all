const Promise = require('./index');

// new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve(200)
//     },3000)
// }).then((res)=>{
//     console.log('res', res);
//     return new Promise((resolve,reject)=> {
//         setTimeout(()=>{
//             reject(333)
//             // resolve(333)
//         }, 1000)
//     })
// },(err)=>{
//     console.log('err', err)
// }).then((res2)=>{
//     console.log('res2', res2);
// },(err)=>{
//     console.log('err2', err)
// }).finally(()=>{
//     console.log('hahah')
// })


let p1 = new Promise((resolve, reject) => {
    setTimeout(()=>{resolve(1)}, 1000)
})
let p2 = 2;
let p3 = new Promise((resolve, reject) => {
    setTimeout(()=>{reject(3)}, 900)
})
let p = Promise.all([p1, p2, p3]);
p.then((res)=>{
    console.log('result', res)
},err=>{console.log('err all',err)})



let pp = Promise.race([p1, p2, p3]);
pp.then((res)=>{
    console.log('result race', res)
}, err=> {
    console.log('err race',err)
})