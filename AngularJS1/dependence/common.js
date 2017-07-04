var CommonApp = angular.module('CommonApp', []);

CommonApp.filter('range', function(){
    return function(_array, _n){
        for(var i = 0; i < _n; i++){
            _array.push(i);
        }
        return _array;
    }
})

//以 function 方式定义，使用时 baseUrl1()
CommonApp.value('baseUrl1', function(){
    return 'http://localhost:81/';
})
//以常量的方式定义，使用时 baseUrl2
CommonApp.value('baseUrl2', 'http://localhost:81/')

//求平方和
CommonApp.factory('calcFactory', function(){
    return {
        square: function(){
            var result = 0;
            for(var i = 0; i < arguments.length; i++){
                result += arguments[i] * arguments[i];
            }
            return result;
        },
        increment: function(){},
        decrement: function(){}
    }
})

//求平方和
CommonApp.service('calcService', function(){
    this.square = function(){
        var result = 0;
        for(var i = 0; i < arguments.length; i++){
            result += arguments[i] * arguments[i];
        }
        return result;
    }
})