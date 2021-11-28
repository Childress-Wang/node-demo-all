async function test(){
    let result = await new Promise((resolve,reject) => {
        resolve('23')
    }).then(
        res=>{
            console.log('res',res);
            return new Promise((resolve,reject) => {
                reject('45')
            })
        },
        err=>{
            console.log('err',err)
        }
    ).then(res=>{
        console.log('res2',res);
    },err=>{
        console.log('err2',err)
        return err;
    });

    console.log('result',result);
}
// test()

async function test2(){
    try {
        let p1 = new Promise((resolve, reject) => {
            setTimeout(()=>{console.log('最终还是执行了');resolve(1)}, 1000)
        })
        let p2 = 2;
        let p3 = new Promise((resolve, reject) => {
            setTimeout(()=>{resolve(3)}, 900)
        })
        let result = await Promise.all([p1, p2, p3])
        console.log('result all', result);
    } catch (error) {
        console.log('发生了错误all', error);
    }
    
}
// test2();

async function test3(){
    let result = await new Promise((resolve, reject) => {
        reject('hahah')
    }).then(res=>{
        console.log('res',res);
    }
    // ,err=>{
    //     console.log('err in then', err);
    // }
        )
    .catch(err=>{
        console.log('err',err);
        return err;
    });
    console.log('reuslt', result);
}

// test3()

async function test4(){
    try {
        let p1 = new Promise((resolve, reject) => {
            setTimeout(()=>{console.log('最终还是执行了 race');resolve(1)}, 5000)
        });
        // let p2 = 2;
        let p3 = new Promise((resolve, reject) => {
            setTimeout(()=>{reject(3)}, 900)
        })
        let result = await Promise.race([p1, p3])
        console.log('result', result);
    } catch (error) {
        console.log('发生了错误', error)
    }
  
}
// test4();``
async function test5(){
    try {
        let p1 = new Promise((resolve, reject) => {
            setTimeout(()=>{console.log('最终还是执行了 race');resolve(1)}, 5000)
        });
        let p2 = 2;
        let p3 = new Promise((resolve, reject) => {
            setTimeout(()=>{reject(3)}, 900)
        })
        let result = await Promise.allSettled([p1, p2, p3])
        console.log('result', result);
    } catch (error) {
        console.log('发生了错误', error)
    } 
}
// test5();

async function test6(){
    try {
        let p1 = new Promise((resolve, reject) => {
            setTimeout(()=>{console.log('最终还是执行了 any');resolve(1)}, 5000)
        });
        let p2 = 2;
        let p3 = new Promise((resolve, reject) => {
            setTimeout(()=>{reject(3)}, 900)
        })
        let result = await Promise.any([p1,p3])
        console.log('result any', result);
    } catch (error) {
        console.log('发生了错误 any', error)
    } 
}

test6()

