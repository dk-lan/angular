var CommonApp = angular.module('CommonApp', []);

CommonApp.filter('range', function(){
    return function(_array, _n){
        for(var i = 0; i < _n; i++){
            _array.push(i);
        }
        return _array;
    }
}) 