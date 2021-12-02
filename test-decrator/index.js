
class Model {
    async getData() {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(200);
            }, 3000)
        })  
    }
}

// 为Model添加计时功能
function timeLog(target,key){
    let descriptors = Object.getOwnPropertyDescriptor(target.prototype, key);
    let value = descriptors.value;
    let newGetData = async() => {
        let startTime = Date.now();
        let result = await value();
        let duration = Date.now() - startTime;
        console.log('getData函数执行耗时：', duration);
        return result
    }
    Object.defineProperty(target.prototype, key, {
        ...descriptors,
        value: newGetData
    })
}


timeLog(Model,'getData');
let model = new Model();
async function test(){
    let data = await model.getData();
    console.log(data);
}

// test()

// 将Model中的一个属性值设置为不可写
function sealOneProperty(target, key){
    let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
    Object.defineProperty(target.prototype, key, {
        ...descriptor,
        writable:false
    })
}
sealOneProperty(Model, 'getData')
let model2 = new Model();
model2.getData = 'li';
console.log('model2.getData', model2.getData);