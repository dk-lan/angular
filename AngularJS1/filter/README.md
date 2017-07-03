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
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/currency.html?_blank)

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
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/date.html?_blank)

## string
字符串过滤器
```html
<body ng-app>
    <!--将结果格式化为大写，结果为 CHINA-->
    <h1>{{"china" | uppercase}}</h1>
    <!--将结果格式化为小写，结果为 china--> 
    <h1>{{"CHINA" | lowercase}}</h1>
    <!--将结果转为标准的 JSON 格式字符串，结果为 { "name": "Jack", "age": 21 }-->
    <!--<h1>{{ {name:'Jack', age: 21} | json}}</h1>-->
</body>
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/string.html?_blank)

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
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/filter/number.html?_blank)

## order by
排序过滤器，应用于在指令 ng-repeat，将数组排序后渲染输出