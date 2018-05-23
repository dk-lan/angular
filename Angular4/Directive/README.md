## 指令概述
在 Angular 中有三种类型的指令：
1. 组件 — 拥有模板的指令。此类指令为最常用的指令。
2. 结构型指令 — 通过添加和移除 DOM 元素改变 DOM 布局的指令。如 `ngFor` `ngIf` 等。
3. 属性型指令 — 改变元素、组件或其它指令的外观和行为的指令。如 `ngStyle` 等。

## 内置指令
指令使用时要在前页加上 `*` 号。

#### ngIf
该指令主要作用于防范空指针错误，比如一个未定义的变量被当成对象使用时会报错。
```javascript
export class AppComponent {
}
```
`<h1>{{currHero.name}}</h1>`  
上面将会抛出错误，原因是 `currHero` 未定义。但加上指令 `ngIf` 则可以避免这种错误  
`<h1 *ngIf="currHero">{{currHero.a}}</h1>`  

该指令当表达式不为 `false` 时 DOM 元素不会存在 Document 中。

#### ngFor
```javascript
export class AppComponent {
    data: Array<any> = [
        {name: 'Tom', age: 18},
        {name: 'Sam', age: 15},
        {name: 'Lucy', age: 28}
    ];
    getKeys(item){
        return Object.keys(item);
    }
}
```
``` html
<ul *ngFor='let obj of data">
    <li>{{obj.name}}</li>
</ul>
```
##### 循环对象
`*ngFor` 指令默认不支持循环对象，所以如果需要循环的数据源为对象时，可以使用 `Object.keys(item)` 的方法将对象的属性转换成数组。
```html
<ul *ngFor="let obj of data">
    <li *ngFor="let key of getKeys(obj)">{{key}}</li>
</ul>
```
##### 模板输入变量
在 `ngFor` 中可以通过  `let` 关键字创建了一个名叫 `obj` 的模版输入变量。  
 如 `<ul *ngFor="let obj of data; let idx = index">`  
模板变量：
- `let idx = index`
- `let odd = odd`
- `let even = even`
- `let first = first`
- `let last = last`

##### trackBy
ngFor指令有时候会性能较差，特别是在大型列表中。对一个条目的一丁点改动、移除或添加，都会导致级联的 DOM 操作。

比如，当通过重新从服务器来刷新通讯录，刷新后的列表可能包含很多以前显示过的联系人。但在 Angular 看来，它不知道哪些是以前就存在过的，只能清理旧列表、舍弃那些DOM元素，并用新的DOM元素来重建一个新列表。  

解决这个问题，可以通过追踪函数来避免这种折腾。追踪函数会告诉 Angular 当重新获取数据时，由于id没有变，Angular 就不会去删除原来的dom，只会更新其中的内容，不同的id再添加新的dom。效率就能提升了
```javascript
trackByName(index, obj) {
    return obj.name;
}
```
```html
<ul *ngFor="let obj of data; trackBy:trackByName">
    <span>{{obj.name}}</span>
</ul>
```

#### ngSwitch
```html
<span [ngSwitch]="userName">
    <span *ngSwitchCase="'张三'">张三</span>
    <span *ngSwitchCase="'李四'">李四</span>
    <span *ngSwitchCase="'王五'">王五</span>
    <span *ngSwitchCase="'赵六'">赵六</span>
    <span *ngSwitchDefault>龙大</span>
</span>
```

#### 自定义指令
1. 新建一个 ts 文件，`highlight.directive.ts`
2. 编写指令代码
```javascript
import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[hl]'
})

export class HighlightDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }
}
```
3. 在根模版 `./src/app.module.ts` 中将指令添加到 `declarations` 数组当中
```javascript
import {HighlightDirective} from './directives/highlight.directive';
@NgModule({
    declarations: [HighlightDirective]
})
```
4. 使用指令
```html
<p hl>{{title}}</p>
```

#### 自定义指令的事件监听：HostListener
在指令中要对指令的宿主元素添加事件监听需要用到 `HostListener` 属性装饰器  
使用格式：`HostListener([事件], [参数]) 事件`
```javascript
//['$event'] 映射到 btn
@HostListener('click', ['$event']) onclick(event) {
    console.log(event);
}
```

上面的事件只作用于当前指令的宿主元素，Angular 也可以监听宿主元素外其它对象的事件。如 window 或 document 对象
```javascript
//['$event'] 映射到 btn
@HostListener('document:click', ['$event']) onclick(event) {
    console.log(event.target);
}
```

除了用 `HostListener` 属性装饰器外也可以在指令配置信息中设定：`host: {'(document:click)': 'onClick($event)'}`
```javascript
import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[hl]',
    host: {
        '(document:click)': 'onClick($event)'
    }    
})

export class HighlightDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }

    onClick(event){
        console.log(event.target);
    }    
}
```

#### 自定义指令的动态属性：HostBinding
可以在定义指令的时候动态给指令宿主添加属性
```javascript
@HostBinding('attr.role') role = 'admin';
```

也可以在指令配置信息中设定
```javascript
@Directive({
    selector: '[hl]',
    host: {
        'name': 'dk'
    }
})
```

#### 获取自定义指令的属性值
```html
<p hl="a" attr1="b" attr2="c">{{title}}</p>
```
要想获得指令元素的属性，要用到 `@Input` 装饰器
```javascript
export class HighlightDirective {
    @Input() hl: string;
    @Input() attr1: string;
    @Input() attr2: string;
    @Input() 
    set attr3(name: string){
        this._name = (name && name.trim()) || 'no name set';
    }
    get attr3(): string{
        return this._name;
    }

    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }

    @HostListener('click', ['$event']) onclick(event) {
        console.log(this.hl, this.attr1, this.attr2);
    }
}
```

当然也可以对属性给别名
```javascript
export class HighlightDirective {
    @Input('hl') attr1: string;
    @Input('attr1') attr2: string;
    @Input('attr2') attr3: string;

    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }

    @HostListener('click', ['$event']) onclick(event) {
        console.log(this.attr1, this.attr2, this.attr3);
    }
}
```