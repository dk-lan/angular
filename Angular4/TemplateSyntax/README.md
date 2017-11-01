## 模板语法（Template Syntax）
```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>',
})
export class AppComponent {
  title = 'Welcome to Anglar';
  name = 'Tom';
  age = 22;
  id = '001';
  className = 'class1';
  actived = true;
  mySize = 100;
}
```

#### 插值表达式
把文本内容绑定到插值字符串（如"Hello Seabiscuit"）
```html
<h1>{{title}}</h1>
```
#### 属性绑定
1. 元素直接绑定常量：
```html
<input type="text" title="form">
```
2. 元素自身属性绑定变量：
```html
<input type="text" [name]="name" [id]="id" >
```
3. 元素自定义属性绑定:
```html
<div [attr.age]="age"></div>
```

#### 元素类名 class 绑定
1. 绑定样式名称为变量
```html
<div [class]="className"></div>  
```
2. 根据表达式来决定 className 出不出现在元素上
```html
<div [class.className]="1 == 1"></div>    
```

#### 元素内联样式绑定：
```html
<div [style.width.px]="mySize" [style.color]="'red'"></div>
```

#### 元素事件绑定：
```html
<input type="button" value="confirm" (click)="confirm($event, args)"/>
```

#### 双向绑定
该指令用于表单元素，所以在使用的时候要在根模块中 `./src/app/app.module.ts` 添加表单模块 `FormsModule`
```javascript
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [FormsModule, BrowserModule]
})
```
```html
<input type="text" [(ngModel)]="name" />
```

#### 本地变量
```html
<h1>{{name.value}}</h1>
<input type="text" [(ngModel)]="name" #name/>
```