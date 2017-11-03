## 依赖注入
依赖注入是重要的程序设计模式。 Angular 有自己的依赖注入框架，离开了它，几乎没法构建 Angular 应用。 它使用得非常广泛，以至于几乎每个人都会把它简称为 DI。

#### 从服务开始来了解依赖注入
创建字典服务 -- ./src/app/service/dictionary.service.ts
```javascript
export class DictionayService {
    lan: String = "cn";
}
```
在根模块依赖注入 -- ./scr/app/app.module.ts  
```javascript
import {DictionayService} from './service/dictionary.service.ts'
@NgModule({
    providers: [
        DictionayService 
    ]
})
```
在根组件使用依赖注入的服务 -- ./src/app/app.component.ts 
```javascript
import { Component} from '@angular/core';
import {DictionayService} from './service/dictionary.service.ts'

@Component({
    selector: 'app-root',
    template: `
        <h1>{{dic.lan}}</h1>
        <select [(ngModel)]="dic.lan">
            <option value="cn">cn</option>
            <option value="en">en</option>
        </select>`,
})
export class AppComponent {
    constructor(private dic: DictionayService) {}
}
```
在根组件使用依赖注入的服务 -- ./src/app/student.component.ts  
```javascript
import { Component} from '@angular/core';
import {DictionayService} from './service/dictionary.service.ts'

@Component({
    selector: 'app-root',
    template: `<h1>{{dic.lan}}</h1>`,
})
export class AppComponent {
    constructor(private dic: DictionayService) {}
}
```

在上面的案例中可以看到当在根组件中更改 DictionayService 的时候，其子组件也同步发生改变。如果在上面案例中不使用依赖注入，而是当普通的类使用，在子组件实例化一个 DictionayService 的实例，会发现当更组件改变的时候，子组件不会发生改变。

所以依赖注入可以理解成一个全局的对象。在根模块依赖注入的时候就实例化好了一个实例，其它组件在使用的时候都是在使用该实例。

#### Injectable 装饰器
在上面的案例中，如果我们想要实现在 DictionayService 发起一个 Ajax 请求，然后把请求的数据在依赖注入后拿来做全局数组对象，那代码将改成下面这样

更改字典服务 -- ./src/app/service/dictionary.service.ts
```javascript
import { Http } from '@angular/http';
export class DictionayService {
    lan: String = "cn";
    dataset: Object;
    constructor(http: Http){
        http.get('api').subscribe((res) => {
            this.dataset = res.json();
          });
    }    
}
```
更改代码后将会发生一个错误  
```
compiler.es5.js:1694Uncaught Error: Can't resolve all parameters for DicService: (?)
```
这是因为在依赖注入的时候，没能将 Http 对象同时依赖注入进来。这个时候就要使用到 Injectable 装饰器。
```javascript
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DictionayService {
    lan: String = "cn";
    dataset: Object;
    constructor(http: Http){
        http.get('api').subscribe((res) => {
            this.dataset = res.json();
          });
    }    
}
```

#### 总结
- 依赖注入可以理解成整个应用的全局对象
- 果所创建的服务不依赖于其他对象，是可以不用使用 Injectable 类装饰器
- 不过比较推荐的做法不管是否有依赖对象，在创建服务时都使用 Injectable 类装饰器。