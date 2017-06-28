# AngularJS
MVVM
MVC
AngularJS、Vue、React 三者都是数据驱动设计模式

## AngularJS 和 Vue 的区别
1. Vue 的作用域是实例化一个 Vue 的实例并挂载到指定的元素
2. AngularJS 的作用域直接在指定元素上添加指令 ng-app 即可，一个页面有且仅有一个 ng-app 指令，也就是说一个页面只能有一个 AngularJS 的作用域
AngularJS 可以有多个 Controller， 但是 Controller 之间不能嵌套



## 指令

```html
    <div id="app">
        <p v-show="1 == 1" dk-show=" 1 == 1"></p>
        <h1>{{1 + 1}}</h1>
    </div>

```
```javascript
    var vm = new Vue({
        el: '#app'
    })
```

```html
    <div ng-app>

    </div>
```
```javascript
```

## 服务
1. $scope
2. $http