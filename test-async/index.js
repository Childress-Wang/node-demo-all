const co =  require('co');
const request = require('request');


function delayPromise(mills) {
    console.log('delayPromise start')
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(50)
        },mills)
    })
}

function addPromise(lastVal){
    console.log('addPromise start')
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(20+lastVal)
        },2000)
    })
}

function longTimeCompute(){
    console.log('长计算开始')
    for(let i = 0; i < 999999999; i++) {

    }
    console.log('长计算结束');
    return 3000;
}

function asyncrequest(){
    return request('https://result.eolink.com/uhyszKyabfd9d2b1aada58d548a19882a03132e9d241fcc?uri=/library/advance/search/1/10', {
        method: 'get'
    },(err, res)=>{
        console.log("res", res.body)
        return res.body;
    })
}

function *g1(){
    console.log('异步流调度开始')
    let json = yield asyncrequest()
    console.log('json', json)
    let mills = yield longTimeCompute();
    console.log('mills'. mills);
    let lastVal = yield delayPromise(mills);
    console.log('lastVal', lastVal);
    let newVal = yield addPromise(lastVal);
    console.log('newVal', newVal);
    
}

let gone = g1();

let ret1 = gone.next();
console.log('ret1', ret1);
let ret2 = gone.next(ret1);
console.log('ret2', ret2);
let ret3 = gone.next(ret2)
console.log('ret3', ret3);
let ret4 = gone.next(ret3)
console.log('ret4', ret4);

// co(g1());



// console.log('我爱你')
// setTimeout(()=>{
//     console.log('一秒之后我爱你')
// },1000)
// console.log('我依然深爱着你')


// async await 