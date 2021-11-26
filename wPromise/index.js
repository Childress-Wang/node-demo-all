/**
 * Promise
 * 静态方法：resolve, reject, race, all
 * 原型方法: then, catch, finnaly
 */

// V1 最简实现
// class Promise{
//     callbacks = [];
//     // 共有三种状态 pendding, fullfilled, rejected,状态流向只能是pendding --> fullfilled,   pedding --> rejected
//     state = 'pendding';
//     value = undefined;
//     // 实例化Promise时，参数为一个函数
//     // 函数参数为resolve 和 reject
//     constructor(fn){
//         fn(this._resolve, this._reject)
//     }

//     then = (fullfilled) => {
//         if (this.state === 'fullfilled') {
//             fullfilled(this.value)
//         } else {
//             this.callbacks.push(fullfilled)
//         }
//         return this;
//     }

//     _resolve = (value) => {
//         this.state = 'fullfilled';
//         this.value = value;
//         this.callbacks.forEach(cb => {
//             cb(value)
//         })
//     }
//     _reject = () => {
        
//     }
// }

// V2 新增链式调用
// class Promise{
//     callbacks = [];
//     // 共有三种状态 pendding, fullfilled, rejected,状态流向只能是pendding --> fullfilled,   pedding --> rejected
//     state = 'pendding';
//     value = undefined;
//     // 实例化Promise时，参数为一个函数
//     // 函数参数为resolve 和 reject
//     constructor(fn){
//         fn(this._resolve, this._reject);
//     }

//     // then的作用是注册回调函数到回调函数队列，在state变为fullfilled时可以得到依次执行。
//     // 事实上，在每次then函数调用以后，都会返回一个新的promise
//     then = (fullfilled) => {
//         // 始终返回一个promise
//         return new Promise((resolve, reject)=> {
//             this._handle({
//                 fullfilled: fullfilled || null,
//                 resolve: resolve
//             })
//         })
//     }


//     _handle = (cb) => {
//        if (this.state === 'pendding') {
//            this.callbacks.push(cb);
//            return;
//        }
//        if (!cb.fullfilled) {
//            cb.resolve(this.value);
//            return
//        }
//        let res = cb.fullfilled(this.value);
//        cb.resolve(res);       
//     }

//     _resolve = (value) => {
//         if (value && (typeof value === 'object' || typeof value === 'function')) {
//             let then = value.then;
//             if (typeof then === 'function') {
//                 then(this._resolve)
//                 return;
//             }
//         }
//         this.state = 'fullfilled';
//         this.value = value;
//         this.callbacks.forEach(cb => {
//             this._handle(cb)
//         })
//     }
//     _reject = () => {
        
//     }
// }

// v3
class Promise{
    callbacks = [];
    // 共有三种状态 pendding, fullfilled, rejected,状态流向只能是pendding --> fullfilled,   pedding --> rejected
    state = 'pendding';
    value = undefined;
    // 实例化Promise时，参数为一个函数
    // 函数参数为resolve 和 reject
    constructor(fn){
        fn(this._resolve, this._reject);
    }

    // then的作用是注册回调函数到回调函数队列，在state变为fullfilled时可以得到依次执行。
    // 事实上，在每次then函数调用以后，都会返回一个新的promise
    then = (onfullfilled, onrejected) => {
        // 始终返回一个promise
        return new Promise((resolve, reject)=> {
            this._handle({
                onfullfilled: onfullfilled || null,
                onrejected: onrejected || null,
                resolve: resolve,
                reject: reject
            })
        })
    }

    catch = (onError) => {
        return this.then(null, onError);
    }

    _handle = (cb) => {
        if (this.state === 'pendding') {
           this.callbacks.push(cb);
           return;
        }
        let cbmethod = this.state === 'fullfilled' ? cb.onfullfilled : cb.onrejected;
        if (!cbmethod) {
            let resolveOrreject = this.state === 'fullfilled' ? cb.resolve : cb.reject
            resolveOrreject(this.value);
            return
        }
        let res;
        let resolveOrreject;
        try {
            res = cbmethod(this.value);
            resolveOrreject = this.state === 'fullfilled' ? cb.resolve : cb.reject;
        } catch(err) {
            res = err;
            resolveOrreject = cb.reject;
        } finally {
            resolveOrreject(res);  
        }
            
    }

    _resolve = (value) => {
        if (value && (typeof value === 'object' || typeof value === 'function')) {
            let then = value.then;
            if (typeof then === 'function') {
                then(this._resolve, this._reject)
                return;
            }
        }
        this.state = 'fullfilled';
        this.value = value;
        this.callbacks.forEach(cb => {
            this._handle(cb)
        })
    }
    _reject = (error) => {
        this.state = 'rejected';
        this.value = error;
        this.callbacks.forEach(cb=>this._handle(cb));
    }
}

module.exports = Promise;