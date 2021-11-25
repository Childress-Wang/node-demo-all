/**
 * Promise
 * 静态方法：resolve, reject, race, all
 * 原型方法: then, catch, finnaly
 */

class Promise{
    callbacks = [];
    // 共有三种状态 pendding, fullfilled, rejected,状态流向只能是pendding --> fullfilled,   pedding --> rejected
    state = 'pendding';
    value = undefined;
    // 实例化Promise时，参数为一个函数
    // 函数参数为resolve 和 reject
    constructor(fn){
        fn(this._resolve, this._reject)
    }

    then = (cb) => {
        if (this.state === 'fullfilled') {
            cb(this.value)
        } else {
            this.callbacks.push(cb)
        }
    }

    // 
    _resolve = (value) => {
        this.state = 'fullfilled';
        this.value = value;
        this.callbacks.forEach(cb => {
            cb(value)
        })
    }
    _reject = () => {

    }
}

module.exports = Promise;