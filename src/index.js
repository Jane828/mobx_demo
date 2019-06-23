import {observable, computed, autorun, when, reaction, action, runInAction} from 'mobx';

class Store {
    @observable string = 'Hello'
    @observable num = 20
    @observable bool = false
    @computed get mixed(){
        return this.string + '/' + this.num
    }
    @action.bound fn(){
        this.string = 'winer';
        this.num = 1314;
    }
}

const store = new Store();

// 1. computed (将多个可观察数据组合成一个可观察数据)
// @computed get mixed(){
//     return this.string + '/' + this.num
// }

// 2. autorun (能自动追踪其引用的可观察数据，并在数据发生变化时自动重新触发)
// autorun使数据改变时能够实时更新视图
// autorun(()=>{
//     console.log(store.string + '/' + store.num) // Hello/20
// })

// autorun(()=>{
//     console.log(store.mixed) // Hello/20 (因为有get, 所以直接不用 store.mixed())
// })

// store.string = 'hello'; // hello/20
// store.num = 300;  // hello/300
// console.log(store.mixed) // 输出 hello/300

// 3. when (提供了条件执行逻辑，算是变种的autorun)
// when(()=>{return store.bool}, ()=>{console.log('it is changed to true')})
// console.log('-------------')
// store.bool = true  -----> 输出 it is changed to true

// 4. reactin (在可观察数据string和num没有被改变之前，reaction不会执行，一旦被改变则执行reaction，所以reaction常用于：当没有初始数据时，不会调用写缓存的逻辑，可以用reaction实现在数据第一次被填充之后才启用写缓存的逻辑)
reaction(()=>[store.string, store.num], arr=>console.log(arr.join('/')))
// store.num = 1000;
// store.string = 'http';

// 5.action 只触发一次，适用于多次重复修改状态的逻辑场景
// const fn = store.fn
// fn的this指向通过bound绑定为store, 而不是window
// fn()

// 6. runInAction (等价于action.bound)
runInAction(()=>{
    store.string = 'winer';
    store.num = 1314;
})