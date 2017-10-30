## 模板语法（Template Syntax）
#### 插值表达式 ( {﻿{...}} )
把文本内容绑定到插值字符串（如"Hello Seabiscuit"）
```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>',
})
export class AppComponent {
  title = 'Welcome to Anglar';
  name = 'DK.Lan';
  className = 'class1';
  actived = true;
  mySize = 100;
}
```

#### 绑定语法
- 元素本身属性绑定 `<input type="text" [name]="name" [value]="name">`
- 元素自定义属性绑定 `<div [attr.role]="name" ></div>` 或者 `<div role="{{name}}" ></div>`
- 元素类名 class1 是否出现在元素上 `<div [class.class1]="actived"></div>`
- 元素内联样式绑定 `<div [style.width.px]="mySize"></div>`
- 元素事件绑定 `<input type="button" value="confirm" (click)="confirm($event, args)"/>`