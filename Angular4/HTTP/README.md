## 提供 HTTP 服务
HttpModule并不是 Angular 的核心模块。 它是 Angular 用来进行 Web 访问的一种可选方式，并位于一个名叫 @angular/http 的独立附属模块中，并作为 Angular 的 npm 包之一而发布出来。

## 注册 HTTP 服务
我们的应用将会依赖于 Angular 的http服务，它本身又依赖于其它支持类服务。 来自@angular/http库中的HttpModule保存着这些 HTTP 相关服务提供商的全集。

我们要能从本应用的任何地方访问这些服务，就要把HttpModule添加到AppModule的imports列表中。 这里同时也是我们引导应用及其根组件AppComponent的地方。
```javascript
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [FormsModule, BrowserModule, HttpModule]
})
```

## HTTP 服务的使用
Angular 的 http.get 返回一个 RxJS 的Observable对象。bservable（可观察对象）是一个管理异步数据流的强力方式。
```javascript
import { Component} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    constructor(private http: Http) {
    } 

    ngOnInit() {
        this.http.get('api').subscribe((res) => {
            console.log(res.json());
        });
    }     
}

```

#### 结果处理 - promise 方式
可以利用 toPromise 操作符把 Observable 对象直接转换成 Promise 对象。不幸的是 Angular 的 Observable只是一个骨架实现，并没有一个 toPromise 操作符。所以要先从 RxJS 库中导入 。然后在 promise 的 then() 回调中，我们调用 HTTP 的 Reponse 对象的 json 方法，用以提取出其中的数据。
```javascript
import { Component} from '@angular/core';
import { Http } from '@angular/http';
//貌似现在最新本已一起打包发布了，所以并不需要这一步
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    constructor(private http: Http) {
    } 

    ngOnInit() {
        this.http.get('api').toPromise().then(response => {
            console.log(response.json());
        }).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        });    
    }       
}
```

#### 传参数
```javascript
import { Component} from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod } from '@angular/http';
//貌似现在最新本已一起打包发布了，所以并不需要这一步
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    constructor(private http: Http) {
    } 

    ngOnInit() {
      //get
        this.http.request('api', new RequestOptions({
          method: RequestMethod.Get,
          search: {name: ''}
        })).toPromise().then(response => {
            console.log(response.json());
        }).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        });   

      //get
        this.http.request('api', new RequestOptions({
          method: RequestMethod.Post,
          body: {name: ''},
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          })
        })).toPromise().then(response => {
            console.log(response.json());
        }).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        });          
    }       
}
```