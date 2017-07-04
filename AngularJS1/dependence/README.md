# 依赖注入
在正常 JavaScript 编程中，我们通常会把不同作用的 JS 放到不同的 JS 文件当中，然后在需要用到的页面引入该文件便可使用。
比如：
```javascript
//a.js
function FunA(arg1, arg2){
    return arg1 * 1 + arg2 * 1;
}
```
```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--引入上面的 a.js-->
        <script type="text/javascript" src="a.js"></script>
    </head>
    <body>
        <script type="text/javascript">
            //调用 FunA()
            var result = FunA(10, 10);
        </script>
    </body>
</html>
```
AngularJS 把上面这种引入与调用换了一种方式，然后给这种方式冠了个名叫做“依赖注入”。
注意：
- 依赖注入 common.js 定义的模块 CommonApp
- 如果有多个模块可以在数组中以字符串数组的方式注入多个模块名称
- 依赖注入的是模块名称，而不是变量名：var app = angular.module('模块名称', [])
- 依赖注入成功后便可以调用 CommonApp 定义的所有过滤器、服务、指令等
这里拿过滤器当中的[自定义过滤器 rang](https://github.com/dk-lan/angularjs-course/tree/master/AngularJS1/filter#自定义过滤器)做例子：
```javascript
//common.js
var CommonApp = angular.module('CommonApp', []);

CommonApp.filter('range', function(){
    return function(_array, _n){
        for(var i = 0; i < _n; i++){
            _array.push(i);
        }
        return _array;
    }
})    
```
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>依赖注入</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="../libs/angular/angular.min.js"></script>
        <!--引入 common.js-->
        <script type="text/javascript" src="common.js"></script>
    </head>
    <body ng-app="myApp" ng-controller="myController">
        <h1 ng-repeat="n in [] | range: 10">{{$index + 1}}</h1>
 
        <script type="text/javascript">
            //依赖注入 common.js 定义的模块 CommonApp
            //如果有多个模块可以在数组中以字符串数组的方式注入多个模块名称
            //依赖注入的是模块名称，而不是变量名：var app = angular.module('模块名称', [])
            //依赖注入成功后便可以调用 CommonApp 定义的所有过滤器、服务、指令等
            var app = angular.module('myApp', ['CommonApp']);

            app.controller('myController', ['$scope', '$http',function($scope, $http){
                
            }])
        </script>
    </body>
</html>
```
在 AngularJS 中，所有控制器中的依赖注入形参都是可以改变的，它们只会依照注入的顺序进行映射，但依赖注入的名称不能改变，上面的控制器还可以这样写：
```javascript
app.controller('myController', ['$scope', '$http',function(a, b){
    //按顺序映射
    //$scope === a // true
    //$http === b //true
}])
```

[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/dependence/dependence.html)

# 常用的依赖注入核心组件

## value
Value 是一个简单的 javascript 对象，用于向控制器传递值，适用于一些没有逻辑的简单定义。
```html
<body ng-app="myApp" ng-controller="myController">
    <p>baseUrl1：{{baseUrl1}}</p>
    <p>baseUrl2：{{baseUrl2}}</p>
    <p>baseUrl3：{{baseUrl3}}</p>
    <p>baseUrl4：{{baseUrl4}}</p>

    <script type="text/javascript">
        var CommonApp = angular.module('CommonApp', []);

        //方式1：以 function 方式定义，使用时 baseUrl1()
        CommonApp.value('baseUrl1', function(){
            return 'http://localhost:81/';
        })
        //方式2：以常量的方式定义，使用时 baseUrl2
        CommonApp.value('baseUrl2', 'http://localhost:81/')

        //方式3
        CommonApp.config(function($provide){
            $provide.value('baseUrl3', 'http://localhost:81/');
        })

        //方式4
        CommonApp.config(function($provide){
            $provide.value('baseUrl4', function(){
                return 'http://localhost:81/';
            });
        })

        var app = angular.module('myApp', ['CommonApp']);
        app.controller('myController', ['$scope', 'baseUrl1', 'baseUrl2', 'baseUrl3', 'baseUrl4',function($scope, baseUrl1, baseUrl2, baseUrl3, baseUrl4){
            $scope.baseUrl1 = baseUrl1();
            $scope.baseUrl2 = baseUrl2;
            $scope.baseUrl3 = baseUrl3;
            $scope.baseUrl4 = baseUrl4();
        }])
    </script>
</body>        
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/dependence/value.html)

## factory
简单的可以理解为面向对象中的工厂模式，函数中返回一个对象
```html
<body ng-app="myApp" ng-controller="myController">
    <input type="text" ng-model="num1" ng-change="calc()"/> + 
    <input type="text" ng-model="num2" ng-change="calc()" /><br/>
    <p>calcFactory1：两个数的平方和 = {{result1}}</p> 
    <p>calcFactory2：两个数的平方和 = {{result2}}</p> 
    <p>calcFactory3：两个数的平方和 = {{result3}}</p> 

    <script type="text/javascript">
        var CommonApp = angular.module('CommonApp', []);

        //方式一：求平方和
        CommonApp.factory('calcFactory1', function(){
            return {
                square: function(){
                    var result = 0;
                    for(var i = 0; i < arguments.length; i++){
                        result += arguments[i] * arguments[i];
                    }
                    return result;
                }
            }
        })
        
        CommonApp.config(function($provide){
            //方式2
            $provide.factory('calcFactory2', function(){
                return {
                    square: function(){
                        var result = 0;
                        for(var i = 0; i < arguments.length; i++){
                            result += arguments[i] * arguments[i];
                        }
                        return result;
                    }
                }                     
            })
            //方式3
            $provide.provider('calcFactory3', function(){
                this.$get = function(){
                    return {
                        square: function(){
                            var result = 0;
                            for(var i = 0; i < arguments.length; i++){
                                result += arguments[i] * arguments[i];
                            }
                            return result;
                        }
                    }                        
                }
            })
        })            

        var app = angular.module('myApp', ['CommonApp']);

        app.controller('myController', ['calcFactory1', 'calcFactory2', 'calcFactory3', '$scope', function(calcFactory1, calcFactory2, calcFactory3, $scope){
            $scope.num1 = 0;
            $scope.num2 = 0;
            
            $scope.calc = function () {
                $scope.result1 = calcFactory1.square($scope.num1, $scope.num2);
                $scope.result2 = calcFactory2.square($scope.num1, $scope.num2);
                $scope.result3 = calcFactory3.square($scope.num1, $scope.num2);
            }  
            $scope.calc();              
        }])
    </script>
</body>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/dependence/factory.html)

## service
简单的可以理解为面向对象中的构造函数模式，使用方式和 Factory 一样
```html
<body ng-app="myApp" ng-controller="myController">
    <input type="text" ng-model="num1" ng-change="calc()"/> + 
    <input type="text" ng-model="num2" ng-change="calc()" /><br/>
    <p>calcService1：两个数的平方和 = {{result1}}</p> 
    <p>calcService2：两个数的平方和 = {{result2}}</p> 

    <script type="text/javascript">
        var CommonApp = angular.module('CommonApp', []);
        
        //方式1
        CommonApp.service('calcService1', function(){
            this.square = function(){
                var result = 0;
                for(var i = 0; i < arguments.length; i++){
                    result += arguments[i] * arguments[i];
                }
                return result;
            }
        })

        //方式2
        CommonApp.config(function($provide){
            $provide.service('calcService2', function(){
                this.square = function(){
                    var result = 0;
                    for(var i = 0; i < arguments.length; i++){
                        result += arguments[i] * arguments[i];
                    }
                    return result;
                }                    
            })                
        })

        var app = angular.module('myApp', ['CommonApp']);

        app.controller('myController', ['calcService1', 'calcService2', '$scope', function(calcService1, calcService2, $scope){
            $scope.num1 = 0;
            $scope.num2 = 0;
            $scope.calc = function () {
                $scope.result1 = calcService1.square($scope.num1, $scope.num2);
                $scope.result2 = calcService2.square($scope.num1, $scope.num2);
            }    
            $scope.calc();            
        }])
    </script>
</body>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/dependence/service.html)

## provider
provider 是 AngularJS 所有服务的基础，除了上面说到的 value、factory、service，控制器也有底层的 $controllerProvider，还有 $compileProvider、$filterProvider 、$provide 等。在服务当中会对 $httpProvider 进行配置。在这里要解释的 provider 可以理解为一个可以动态配置的服务。

上面解释了 factory 和 service，案例写的是计算两个数的平方和，如果需求变为两个数的和或者是两个数相减，那就要去改动函数体。而 AngularJS 在这方面提供了通过配置来达到这种需求的解决方案，这种方案就是 provider，可以在使用前先配置。

案例通过一个加和减的运算来说明：
1. 定义一个 provider，名为：calcProvider
```javascript
CommonApp.provider('calcProvider', function(){});
```
2. 在 calcProvider 的函数体里定义一个外部可访问的属性 symbol，用以表达运算符，默认为 +。此属性不能在控制器中访问，只能在配置时能访问。
```javascript
CommonApp.provider('calcProvider', function(){
    this.symbol = '+';
});
```
3. 对运算符进行运算实现。provider 提供了一个 $get 方法，只有此方法的返回值能在控制器中被访问。
```javascript
CommonApp.provider('calcProvider', function(){
    this.symbol = '+';
    //此方法的返回值能被控制器访问。在控制器中 calcProvider = {symbol: '', operation: function(){}}
    this.$get = function(){
        return {
            symbol: this.symbol,
            operation: function(n1, n2){
                var result = 0;                         
                switch(this.symbol){
                    case '+':
                        result = n1 * 1 + n2 * 1;
                        break;
                    default :     
                        result = n1 * 1 - n2 * 1;
                        break;                                                                   
                }
                return result;
            }.bind(this)
        }
    }.bind(this)
})
```
4. 如果在使用前想改变运算符为减号（-），则可以使用 config 进行配置，其中配置的 provider 名则一定要原来的 provider 名加上 Provider，如 calcProvider 要写成 calcProviderProvider
```javascript
app.config(function(calcProviderProvider){
    calcProviderProvider.symbol = '-';
})
```
完整代码如下：
```html
<body ng-app="myApp" ng-controller="myController">
    <div>
        <span>运算符：{{symbol}} </span>
        <h1>{{baseUrl}}</h1>
    </div>
    <input type="text" ng-model="num1" ng-change="calc()"/> {{symbol}} 
    <input type="text" ng-model="num2" ng-change="calc()" /> = {{result}}

    <script type="text/javascript">
        var CommonApp = angular.module('CommonApp', []);
        //定义一个 provider，名叫 calcProvider
        CommonApp.provider('calcProvider', function(){
            //定义一个运算符，这个案例以加和减两种运算来说明
            //默认为加运算
            //此属性只能在 config 中访问
            this.symbol = '+';
            //此方法的返回值只能被控制器访问
            this.$get = function(){
                return {
                    symbol: this.symbol,
                    operation: function(n1, n2){
                        var result = 0;                         
                        switch(this.symbol){
                            case '+':
                                result = n1 * 1 + n2 * 1;
                                break;
                            default :     
                                result = n1 * 1 - n2 * 1;
                                break;                                                                   
                        }
                        return result;
                    }.bind(this)
                }
            }.bind(this)
        })

        //依赖注入
        var app = angular.module('myApp', ['CommonApp']);

        //配置 providername + Provider => calcProvider + Provider = calcProviderProvider
        app.config(function(calcProviderProvider){
            calcProviderProvider.symbol = '-';
        })
        app.controller('myController', ['calcProvider', '$scope', function(calcProvider, $scope){
            $scope.num1 = 0;
            $scope.num2 = 0;
            $scope.symbol = calcProvider.symbol;
            $scope.result = calcProvider.operation($scope.num1, $scope.num2);
            $scope.calc = function () {
                $scope.result = calcProvider.operation($scope.num1, $scope.num2);
            }                
        }])
    </script>
</body>    
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/dependence/provide.html)