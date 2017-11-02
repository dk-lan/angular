## 路由
通过 URL 映射到对应的功能实现，也就是不同的 URL 会渲染对应的组件。URL 的切换实际就是组件之间的切换。

#### 简单的路由入门
宿主页面 -- index.html  
大多数带路由的应用都要在 `index.html` 的 `<head>` 标签下先添加一个 `<base>`元素，来告诉路由器该如何合成导航用的URL。
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Project</title>
    <base href="/">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
    <app-root></app-root>
</body>
</html>
```
路由配置文件 -- router.js  
路由器需要先配置才会有路由信息，用 `RouterModule.forRoot` 方法来配置路由器， 并把它的返回值添加到 `AppModule` 的 `imports` 数组中。
```javascript
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from '../components/students/students.component';
import { LoginComponent } from '../components/login/login.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'students', component: StudentsComponent},
]

export const RootRouter = RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  )
```
根组件 -- app.component.html  
路由切换时要把对应的组件输出到对应的位置，该位置称之为路由出口 `<router-outlet></router-outlet>`  
一个模板中只能有一个未命名的 `<router-outlet>`。 但路由器可以支持多个命名的路由出口。
```html
<h1>app</h1>
<a routerLink="/login">Login</a>
<a routerLink="/students">Student</a>
<router-outlet></router-outlet>
```
根模块 -- app.module.ts
```javascript
import {RootRouter} from './router/root.router';
@NgModule({
    imports: [
        RootRouter
    ]
})
```

#### 通配符路由
除路由配置表中的路由，浏览器访问其它路由都会报错。Angular 提供了一个通配符路由来拦截所有无效的路由，也就是所有不在路由配置表中的路由都会导航到该路由。
```javascript
const appRoutes: Routes = [
    {path: '**', component:　PagenotfoundComponent}
]
```

#### 重定向路由
重定向路由需要一个pathMatch属性，来告诉路由器如何用URL去匹配路由的路径，否则路由器就会报错。也就是说路由器应该只有在完整的URL等于''时才选择 `LoginComponent` 组件，因此我们要把pathMatch设置为'full'。
```javascript
const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
]
```

#### 路由参数
路由配置表
```javascript
const appRoutes: Routes = [
    {path: 'students/:id/:name', component: StudentsComponent}
]
```
接收参数
```javascript
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) { }
    ngOnInit() {
        //转成对象
        this.route.params.subscribe((params) => {
            console.log(params);
        });
        //单个接收
        this.route.snapshot.paramMap.get('name');
    }
}
```

#### 路由跳转
```javascript
this.router.navigate(['/students/10/admin']);
```

#### 路由嵌套
路由配置表
```javascript
const appRoutes: Routes = [
    {
        path: 'students', 
        component: StudentsComponent，
        children: [
            {path: 'get', component: GetComponent}
        ]
    }
]
```
在 `StudentsComponent` 中要添加 `<router-outlet></router-outlet>`