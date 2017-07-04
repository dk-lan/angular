# 控制器
AngularJS 的控制器在 MVC 框架中扮演着 C 层的角色，主要是对业务逻辑的控制，然后通过对象映射到 V 层。

其作用域是通过指令 ng-controller 进行声明。

控制器与视图中之间是通过服务 $scope 进行通信的，服务 $scope 在 AngularJS 当中扮演着一个非常重要的通信角色，可以说 $scope 是整个 AngularJS 的核心。

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="../libs/angular/angular.min.js"></script>
    </head>
    <body ng-app="myApp" ng-controller="myController">
        <!--结果会显示 $scope.user.name 的值 Tom-->
        <p>{{user.name}}</p>
        <!--结果会显示 $scope.user.age 的值 22-->
        <p>{{user.age}}</p>

        <script type="text/javascript">
            var myApp = angular.module('myApp', []);
            myApp.controller('myController', ['$scope', function($scope){
                $scope.user = {
                    name: 'Tom',
                    age: 22
                }
            }])
        </script>
    </body>
</html>
```
当然上面的控制器也可以简写，但这样写会在代码压缩的时候容易出错，一般情况下 JS 代码在压缩的时候会把形参改变，但在 AngularJS 的控制器像这种简写的情况下，形参必须为 $scope，否则就会出错。所以为了避免这种情况，建议用[依赖注入](https://github.com/dk-lan/angularjs-course/tree/master/AngularJS1/dependence)的方式去写。
```javascript
var myApp = angular.module('myApp', []);
myApp.controller('myController', function($scope){
    $scope.user = {
        name: 'Tom',
        age: 22
    }
})
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/controller/controller.html?_blank)

根元素 ng-app 可以没有属性值，如果有属性值则一定要在 js 中定义声明，且属性值一定要和声明中的模块名一致。如：
```html
    <div ng-app="dkApp"></div>
```
```javascript
    var app = angular.module('dkApp', []);
```
控制器 ng-controller 的属性值也一定要进行声明，声明的规则和根元素 ng-app 一致，属性值和声明的控制器名必须一致。
```html
    <div ng-app="dkApp" ng-controller="dkController">
    </div>
```
```javascript
    var app = angular.module('dkApp', []);
    app.controller('dkController', ['$scope', function($scope){}])
```

一个根指令 ng-app 当中可以有多个控制器，每个控制器不能相互嵌套使用。每个控制器中的 $scope 是相互独立的。
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="../libs/angular/angular.min.js"></script>
    </head>
    <body ng-app="myApp">
        <fieldset>
            <legend><h3>控制器1 myController1</h3></legend>
            <div ng-controller="myController1">
                <!--结果会显示 myController1.$scope.user.name 的值 Tom-->
                <p>{{user.name}}</p>
                <!--结果会显示 myController1.$scope.user.age 的值 22-->
                <p>{{user.age}}</p>                
            </div>            
        </fieldset>

        <fieldset>
            <legend><h3>控制器2 myController2</h3></legend>
            <div ng-controller="myController2">
                <!--结果会显示 myController2.$scope.user.name 的值 Lucy-->
                <p>{{user.name}}</p>
                <!--结果会显示 myController2.$scope.user.age 的值 20-->
                <p>{{user.age}}</p>                
            </div>            
        </fieldset>       


        <script type="text/javascript">
            var myApp = angular.module('myApp', []);

            myApp.controller('myController1', ['$scope', function($scope){
                $scope.user = {
                    name: 'Tom',
                    age: 22
                }
            }])

            myApp.controller('myController2', ['$scope', function($scope){
                $scope.user = {
                    name: 'Lucy',
                    age: 20
                }
            }])            
        </script>
    </body>
</html>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/controller/controllers.html?_blank)