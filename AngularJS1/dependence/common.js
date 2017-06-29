var CommonApp = angular.module('CommonApp', []);

CommonApp.filter('range', function(){
    return function(_array, _n){
        for(var i = 0; i < _n; i++){
            _array.push(i);
        }
        return _array;
    }
})

CommonApp.value('defaultValue', function(){
    return Math.random();
});

CommonApp.value('baseUrl', function(){
    return 'http://localhost:81/';
})

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