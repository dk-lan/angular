# AngularJS 1.x
本教程主要是针对 AngularJS 1.5 和 1.6 进行开展，因为 2.0 以后的版本有了非常大的变化，所以单独放到另一个教程中讲解

# 技术目录
- 作用域和表达式
- [控制器](https://github.com/dk-lan/angularjs-course/tree/master/AngularJS1/controller)
- [指令](https://github.com/dk-lan/angularjs-course/tree/master/AngularJS1/directive)
- [过滤器](https://github.com/dk-lan/angularjs-course/tree/master/AngularJS1/filter)
- [依赖注入](https://github.com/dk-lan/angularjs-course/tree/master/AngularJS1/dependence)
- 服务
- 自定义指令
- 路由
- 项目应用

# 作用域和表达式

## 作用域
使用 AnuglarJS 前必须得明确一块区域作为有效的作用域，超出这个作用域的所有 AngluarJS 相关指令和表达式都不会生效。

AngularJS 对作用域的声明就是在一个容器元素中加入根指令 ng-app

```html
    <body ng-app>
        <p>有指令 ng-app 的元素区域即是 AngularJS 的作用域</p>
    </body>
```
根指令 ng-app 可以加入到任意一个元素当中去，一个页面有且仅有一个根指令 ng-app

## 表达式
AngularJS 的表达式是写在双花括号当中：{{expression}}，表达式可以是任意 JS 的表达式，最终将表达式的结果输出到 HTML 指定的元素当中
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--使用 AngularJS 前必须先引入库文件-->
        <script type="text/javascript" src="./libs/angular/angular.min.js"></script>
    </head>
    <body ng-app>
        <!--结果将会输出 2-->
        <p>{{1 + 1}}</p>
        <!--ng-init 等同于在 js 中定义了一个对象 myObj-->
        <div ng-init="myObj = {name: 'DK', age: 18}">
            <!--结果将输出 DK-->
            <p>{{name}}</p>
            <!--结果将输出 18-->
            <p>{{age}}</p>
        </div>
    </body> 
</html>    
```
[效果预览](https://dk-lan.github.io/angularjs-course/AngularJS1/expression.html)