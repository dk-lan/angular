## 创建简单的组件
1. 创建文件
在 `./src/app` 目录下手动创建或者在 Angular-CLI 中用命令
`ng g c [component-name] -it -is # 表示新建组件，该组件使用内联模板和内联样式`
执行上面命令后会在 `./src/app` 目录下自动创建对应的组件目录和组件文件，同时会修改 `src/app/app.module.ts` 文件，将新建的组件添加到 `@NgModule` 的 `declarations` 数组中。  

2. 编写组件代码
```javascript
//加载组件装饰器
import { Component } from '@angular/core';
//@Component装饰器为组件提供了Angular元数据。
@Component({
  selector: 'app-root', //用来渲染组件内容的选择器
  templateUrl: './app.component.html',//加载 html
  template：'<h1>{{title}}</h1>',
  styleUrls: ['./app.component.css'] //加载 css
  styles: ['*{padding: 0; margin: 0;}']
})
//总是export这个组件类，因为你必然会在别处import它。
export class AppComponent {
  title = 'Tour of Heroes'; //定义变量
}
```

3.在根模版 `./src/app.module.ts` 中将指令添加到 `declarations` 数组当中
```javascript
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
@NgModule({
    declarations: [HeroDetailComponent]
})
```
4.使用组件
```html
<app-root></app-root>
```

## 组件模板
在组件装饰器中用 `template` 或 `templateUrl` 来定义组件模板，两者只能出现一个，如果两者同时出现，后者会覆盖前者。

## 组件样式
在组件装饰器中用 `styles` 或 `styleUrls` 来定义组件样式，两者只能出现一个，如果两者同时出现，后者会覆盖前者。

把样式加入组件有以下几种方式：
#### styles
```javascript
@Component({
  selector: 'app-root',
  template: `<h1>App</h1>`,
  styles: ['h1 { font-weight: normal; }']
})
export class AppComponent {
/* . . . */
}
```

#### styleUrls
```javascript
@Component({
  selector: 'app-root',
  template: `<h1>App</h1>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
/* . . . */
}
```

#### 模板内联样式
```javascript
@Component({
  selector: 'app-root',
  template: `
    <style>
      button {
        background-color: white;
        border: 1px solid #777;
      }
    </style>
    <h3>Controls</h3>
    <button (click)="activate()">Activate</button>
    `
})
export class AppComponent {
/* . . . */
}
```

#### 模板中的link标签
```javascript
@Component({
  selector: 'app-root',
  template: `
    <link rel="stylesheet" href="assets/app.component.css">
    <h3>Team</h3>
    <ul>
      <li *ngFor="let member of hero.team">
        {{member}}
      </li>
    </ul>
    `
})
export class AppComponent {
/* . . . */
}
```

#### CSS @imports 语法
```javascript
@import 'hero-details-box.css';
```

## 组件生命周期
指令和组件的实例有一个生命周期：新建、更新和销毁。 通过实现一个或多个 Angular core库里定义的生命周期钩子接口  

每个接口都有唯一的一个钩子方法，它们的名字是由接口名再加上ng前缀构成的。如:OnInit
```javascript
import { Component, OnChanges, OnInit, DoCheck, OnDestroy } from '@angular/core';
export class AppComponent implements OnChanges, OnInit, DoCheck, OnDestroy {
    ngOnChanges(){}

    ngOnInit(){}
    
    ngDoCheck(){}

    ngOnDestroy(){}
}
```

#### OnChanges
- 当Angular（重新）设置数据绑定输入属性时响应。 该方法接受当前和上一属性值的SimpleChanges对象。
- 当被绑定的输入属性的值发生变化时调用，首次调用一定会发生在ngOnInit()之前。

#### OnInit
- 在 Angular第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件时触发。
- 在第一轮 ngOnChanges() 完成之后调用，只调用一次。
- 在 onDestroy() 后重新渲染后会被调用。

#### AfterContentInit
- 当把内容投影进组件之后调用。第一次ngDoCheck()之后调用，只调用一次。
- 只适用于组件。

#### DoCheck
- 使用DoCheck钩子来检测那些Angular自身无法捕获的变更并采取行动。如引用类型的赋值。
- 给组件赋值同一个对象的时候，不会触发 OnChanges，但会触发 DoCheck。

#### AfterContentChecked
- 每次完成被投影组件内容的变更检测之后调用。
- ngAfterContentInit()和每次ngDoCheck()之后调用。
- 只适用于组件。

#### OnDestroy
- 当Angular每次销毁指令/组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。
- 在Angular销毁指令/组件之前调用。
- 没有对应的销毁后钩子函数。

#### AfterViewInit
- Angular会在每次创建了组件的子视图后调用它们。
- 可用于监听子组件加载完成。

#### AfterViewChecked
- Angular 会在每次子视图修改后会调用它们。
- 可用于监听子组件修改完成。

## 组件通信
#### 通过 @Input 实现子组件调用父组件  

父组件定义
```javascript
import { Component } from '@angular/core';

export class Hero {
    id: number;
    name: string;
}

const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  heroes = HEROES;
  currHero: Hero;

  selectHero(hero: Hero) {
    this.currHero = hero;
  }  
}
```
父组件的 template 并在里面调用子组件
```html
<ul class="heroes">
    <li *ngFor="let hero of heroes" (click)="selectHero(hero)">
        <span class="badge">{{hero.id}}</span>{{hero.name}}
    </li>
</ul>
<hero *ngIf="currHero" [currHero]="currHero"></hero>
```
子组件定义
```javascript

import { Component, Input } from '@angular/core';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent{
  @Input() currHero: Object;
}
```
子组件的 template
```html
<div *ngIf="currHero">
  <h2>{{currHero.name}} details!</h2>
  <div><label>id: </label>{{currHero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="currHero.name" placeholder="name"/>
  </div>
</div>
```

#### 通过 @Output 实现父组件调用子组件
子组件暴露一个EventEmitter属性，当事件发生时，子组件利用该属性emits(向上弹射)事件。父组件绑定到这个事件属性，并在事件发生时作出回应。

子组件的EventEmitter属性是一个输出属性，通常带有@Output装饰器，就像在VoterComponent中看到的。  

父组件定义
```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  parentEvent(val: Boolean){
    console.log(val);
  }
}
```
父组件的 template 并在里面调用子组件
```html
<hero (parentAttr)="parentEvent($event)"></hero>
```
子组件定义
```javascript
import { Component, Output } from '@angular/core';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent{
  @Output() parentAttr = new EventEmitter<Boolean>();
  childrenEvent(val: Boolean){
    this.parentAttr.emit(val);
  }
}
```
子组件的 template
```html
<button (click)="childrenEvent(true)">Agree</button>
```

#### 父组件与子组件通过本地变量互动
父组件定义
```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  parentEvent(arg1){
    console.log(arg1);
  }
}
```
父组件的 template 并在里面调用子组件
```html
<button (click)="parentEvent(childrenComponent)">Stop</button>
<hero #childrenComponent></hero>
```
子组件定义
```javascript
import { Component, Output } from '@angular/core';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent{
  title = "Children Component";
}
```

#### 通过服务来通信