# 指令
AngularJS 的指令是带有前缀 ng- 的元素属性。

## 常用指令

### ng-app
根指令，每个页面有且仅有一个根指令，其起到了对 AngularJS 作用域进行声明的作用。如果有属性值则一定要在 js 通过 angular.module() 进行声明。

### ng-controller
在根元素下声明控制器的作用域，一个根元素下可以有多个控制器，分别用不同的名称进行区分，每个控制器相互独立但不能相互嵌套。

可以通过 angular.module(根元素, []).controller() 进行声明。

### ng-init
给服务 $scope 初始化数据，作用等同于在 $scope 中定义一个属性。此指令可用于简单的定义一些属性
```html
    <div ng-app ng-init="myObj = {name: 'Tom', age: 18}">
        <p>{{name}}</p>
        <p>{{age}}</p>
    </div>
```
等同于
```html
    <div ng-app="myApp" ng-controller="myController">
        <p>{{name}}</p>
        <p>{{age}}</p>    
    </div>
```
```javascript
    var myApp = angular.module('myController', []);

    myApp.controller('myController', ['$scope', function($scope){
        $scope.myObj= {name: 'Tom', age: 18}
    }])
```


### ng-bind
数据绑定，效果等同于 {{}}，不过前者权利高于后者
```html
    <!--结果输出：1 + 1 = 2 -->
    <h1 ng-bind="'1 + 1 =' + (1 + 1)">{{10 + 10}}</h1>
```

### ng-bind-html
用于输出 HTML 标签，在使用前要先引入 angular-sanitize.min.js，然后在定义 ng-app 模块的时候要添加依赖注入 ngSanitize
```html
    <div ng-init="html = '<h1>AngularJS1.5</h1>'">
        <div ng-bind-html="html"></div>
    </div> 
```
```javascript
    var dkApp = angular.module('dkApp', ['ngSanitize']);
```

### ng-model
双向绑定，但仅限于表单元素。
```html
    <input type="text" ng-model="model">
    <h1 ng-bind="model"></h1>
```

### ng-bind-template
字符串模版绑定，和 ng-bind  类似，不一样的是 ng-bind 在表达式中如果有字符串要添加引号，而 ng-bind-template 不需要。
```html
    <div ng-init="myObj = {name: 'DK', age: 18}">
        <h1 ng-bind-template="This is {{myObj.name}}, I'm {{myObj.age}} years old"></h1>
        <h1 ng-bind="'This is' + myObj.name + ', I am ' + myObj.age + ' years old'"></h1>
        <h1>This is {{myObj.name}}, I'm {{myObj.age}} years old</h1>
    </div>
```

### ng-non-bindable
不执行 {{expression}} 表达式。
```html
    <div ng-init="myObj = {name: 'DK', age: 18}">
        <h1>This is {{myObj.name}}, I'm {{myObj.age}} years old</h1>
        <h1 ng-non-bindable>This is {{myObj.name}}, I'm {{myObj.age}} years old</h1>
    </div>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/directive/directive.html?_blank)