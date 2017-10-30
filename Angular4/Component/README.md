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
`templateUrl template` 和 `styleUrls` 和 `styles` 两者都只需要存在一个，如果两个都存在的情况下后面的会冲掉上面的，也就是只有后面的起作用。  
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
- 通过 @Input 实现子组件调用父组件
- 通过 @Output 实现父组件调用子组件
- 通过服务来通信