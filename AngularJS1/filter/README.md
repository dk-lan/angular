# 过滤器
过滤器可以从功能上理解：
1. 从数据源中过滤出想要的数据
2. 将数据过滤成自己想要的格式

# 使用
- 基本用法：{{ expression | filter }} 
- 链式使用：{{ expression | filter1 | filter2 | ... }}
- 参数使用：{{ expression | filter: argument1, argument2 }} 

# 常用的过滤器

## currency
货币过滤器，将表达式的结果进行格式化为指定的货币格式，默认是美元 $。
```html
<body ng-app>
    <!--将12格式化为货币，默认单位符号为 '$', 小数默认2位 => $12.00-->
    <p>{{ 12 + 12 | currency}}</p>
    <!--将12.45格式化为货币，使用自定义单位符号为 '￥', 小数默认2位-->
    <p>{{ 12.45 | currency:'￥'}}</p>
    <!--将12.45格式化为货币，使用自定义单位符号为 'CHY￥', 小数指定1位, 会执行四舍五入操作 -->
    <p>{{ 12.45 | currency:'CHY￥':1}} </p>
    <!--将12.55格式化为货币， 不改变单位符号， 小数部分将四舍五入 -->
    <p>{{ 12.55 | currency:undefined:2}} </p>
</body>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/currency.html)

## date
日期过滤器，将表达式的结果进行格式化为指定的日期格式。
```html
<body ng-app>
	<!--使用ISO标准日期格式 结果为 11/30/2016 9:49AM-->
    <p>{{ '2016-11-30T09:49:05' | date:"MM/dd/yyyy h:mma" }}</p>
    <!--使用13位（单位：毫秒）时间戳 结果为 05/20/2015 6:52AM-->
    <p>{{ 1432075948123 | date:"MM/dd/yyyy h:mma"}}</p>
    <!--指定timezone为UTC 结果为 05/19/2015 10:52PM-->
    <p>{{ 1432075948123 | date:"MM/dd/yyyy h:mma":"UTC"}} </p>
    <!--结果为 2017年06月28日-->
    <p>{{'2017-06-28' | date: 'yyyy年MM月dd日'}}</p>
</body>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/date.html)

## string
字符串过滤器
```html
<body ng-app ng-init="myObj = {name:'Jack', age: 21}">
    <!--将结果格式化为大写，结果为 CHINA-->
    <h1>{{"china" | uppercase}}</h1>
    <!--将结果格式化为小写，结果为 china--> 
    <h1>{{"CHINA" | lowercase}}</h1>
    <!--将结果转为标准的 JSON 格式字符串，结果为 { "name": "Jack", "age": 21 }-->
    <h1>{{ myObj | json}}</h1>
</body>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/string.html)

## number
数字过滤器
```html
<body ng-app>
	<!-- 将字符串转化为数据 -->
    <h1>{{ "3456789" | number}}</h1>
    <!-- 将数据格式化为 3 位小数，结果为 12345678.000-->
    <h1>{{ 12345678 | number:3}}</h1>
</body>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/number.html)

## order by
排序过滤器，应用于在指令 ng-repeat，将数组排序后渲染输出

格式：orderBy:['要排序的属性']，默认为升序排，

倒序排序：在对应的属性前面加 “-” 号，orderBy:['-要排序的属性']。

多个排序条件： orderBy:['属性1', '属性2']，则结果会先按属性1 进行排序，如果属性1 有相同的值则会按属性2 排序

在排序的过程中同时可以限制循环输出的次数： limit: n。(n >= 1)
```html
<div ng-init="myArr = [{name:'Tom1', age:20, deposit: 300}, {name:'Tom2', age:22, deposit: 200}, {name:'Tom3', age:50, deposit: 200}, {name:'May', age:21, deposit: 300}, {name:'Jack', age:20, deposit:100}, {name:'Alice', age:22, deposit: 150}]">
    <!--按 name 进行升序排序-->
    <div ng-repeat="u in myArr | orderBy: ['name']">
        <p>Name:{{u.name}}</p>
        <p>Deposit:{{u.deposit}}</p>
        <p>Age:{{u.age}}</p>    
    </div>
    <!--按 name 进行倒序排序-->
    <div ng-repeat="u in myArr | orderBy: ['-name']">
        <p>Name:{{u.name}}</p>
        <p>Deposit:{{u.deposit}}</p>
        <p>Age:{{u.age}}</p>    
    </div> 
    <!--先按 name 进行排序，如果 name 相同时则会按 age 排序-->
    <div ng-repeat="u in myArr | orderBy: ['name', 'age']">
        <p>Name:{{u.name}}</p>
        <p>Deposit:{{u.deposit}}</p>
        <p>Age:{{u.age}}</p>    
    </div>   
    <!--限制循环输出的次数为 3，结果只输出前 3 个对象-->
    <div ng-repeat="u in myArr | orderBy: ['name'] | limit: 5">
        <p>Name:{{u.name}}</p>
        <p>Deposit:{{u.deposit}}</p>
        <p>Age:{{u.age}}</p>    
    </div>         
</div>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/orderby.html)

## filter (数组过滤器)
在循环数组渲染结果的过程中，如果想要过滤掉一些不想要的结果，得到自己想要的结果，则可以用过滤器 filter。

不用过滤器，用 ng-if 过滤
```html
<div ng-init="myArr1 = [{name:'Tom', age:20}, {name:'Tom Senior', age:50}, {name:'May', age:21}, {name:'Jack', age:20}, {name:'Alice', age:22}]">
    <!--得到 name 包含字母 o 的对象-->
    <div ng-repeat="u in myArr1" ng-if="u.name.indexOf('o') > -1">
        <p>Name:{{u.name}}</p>
        <p>Age:{{u.age}}</p>
        <br />
    </div>
</div>
```
过滤器：filter: object
```html
<div ng-init="myArr2 = [{name:'Tom', age:20}, {name:'Tom Senior', age:50}, {name:'May', age:21}, {name:'Jack', age:20}, {name:'Alice', age:22}]">
    <!--得到 ange = 20 的对象-->
    <div ng-repeat="u in myArr2 | filter: {age: 20}">
        <p>Name:{{u.name}}</p>
        <p>Age:{{u.age}}</p>
        <br />
    </div>
</div>
```
过滤器：filter: function(item){}。function 一定要在控制器当中定义，ng-repeat 每循环一次都会回调这个 function，且会将当前对象以参数的方式传递过去，所以可以通过回调函数的参数 item 来过滤出想要的对象。如果在回调函数中没有返回值则会过滤掉当前对象。
```html
<div ng-controller="myCtr1" ng-init="myArr3 = [{name:'Tom', age:20}, {name:'Tom Senior', age:50}, {name:'May', age:21}, {name:'Jack', age:20}, {name:'Alice', age:22}]">
    <!--每循环一次 Angular 都会调用方法 myFilter-->
    <div ng-repeat="u in myArr3 | filter: myFilter">
        <p>Name:{{u.name}}</p>
        <p>Age:{{u.age}}</p>
        <br />
    </div>
</div>
<script type="text/javascript">
    var app = angular.module('myApp', []);
    app.controller('myCtr1', function ($scope) {
        //自定义回调函数
        $scope.myFilter = function (item) {
            //item 为每个循环的对象，过滤出 age = 22 的对象
            if (item.age == 22) {
                return item;
            }
        }
    })
</script>
```
过滤器：filter: object : comparator，第二个参数 comparator 的类型可为 boolean，
comparator = false (默认值)，将以大小写不敏感的方式匹配任意内容，也就是模糊匹配
comparator = true，大小写及内容均需完全匹配，也就是精确匹配
```html
<div ng-init="myArr4 = [{name:'我是英雄', age:20}, {name:'Tom Senior', age:50}, {name:'May', age:21}, {name:'Jack', age:20}, {name:'Alice', age:22}]">
    Name: <input type="text" ng-model="name4"/>
    <!-- 指定comparator为false或者undefined，即为默认值可不传，将以大小写不敏感的方式匹配任意内容 -->
    <!-- 可以试试把下面代码的comparator为true，true即大小写及内容均需完全匹配 -->
    <!-- comparator => false(defalut) => 模糊查询 | true => 精确定查询 -->            
    <div ng-repeat="u in myArr4 | filter: {name: name4} : true">
        <p>Name:{{u.name}}</p>
        <p>Age:{{u.age}}</p>
        <br />
    </div>
</div>
```
过滤器：filter: object : comparator，第二个参数 comparator 的类型可为 function。
function 授受 2 个参数，第一个参数为过滤对象的属性，如 filter: {name: 'test'}，则是对象的 name 属性
第 2 个参数为对应属性的值
```html
<div  ng-controller="myCtr5" ng-init="myArr5 = [{name:'我是英雄', age:20}, {name:'Tom Senior', age:50}, {name:'May', age:21}, {name:'Jack', age:20}, {name:'Alice', age:22}]">
    Name: <input type="text" ng-model="name5"/>          
    <div ng-repeat="u in myArr5 | filter: {name: name5} : myComparator">
        <p>Name:{{u.name}}</p>
        <p>Age:{{u.age}}</p>
        <br />
    </div>
    <script type="text/javascript">
        app.controller('myCtr5', function ($scope) {
            //arg1 为每次循环对象的指定属性，在这里是 name
            //arg2 为属性值，这里指 $scope.name5
            //结果要过滤对象 name = $scope.name5 的对象
            $scope.myComparator = function (arg1, arg2) {
                return arg1 == arg2;
            }
        })
    </script>
</div>   
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/array.html)

## 自定义过滤器
以上过滤器如果不够的话，AngularJS 支持自定义过滤器。比如需要循环一个指定的数，我们可以自定义过滤器去实现。
格式: app.filter('filterName', function(){return function(express, arg1, arg2..){}})
```html
    <body ng-app="myApp" ng-controller="myCtroller">
        <!--如果没有过滤器则不会有 h1 元素渲染出来-->
        <!--自定义一个过滤器，名称为 range，传了个参数 10 过去表示长度-->
        <h1 ng-repeat="n in [] | range: 10">{{$index + 1}}</h1>
        <script type="text/javascript">
            var app = angular.module('myApp', []);
            app.controller('myCtroller', ['$scope', '$http', function($scope, $http){
            }])

            app.filter('range', function(){
                //参数 _array 为空数组 []
                //参数 _n 为过滤器的参数 10
                return function(_array, _n){
                    for(var i = 0; i < _n; i++){
                        _array.push(i);
                    }
                    return _array;
                }
            })
        </script>
    </body>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/autofilter.html)