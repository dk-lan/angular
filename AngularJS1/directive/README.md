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


