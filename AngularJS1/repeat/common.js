var commonApp = angular.module('commonApp', []);

commonApp.value('baseUrl', 'http://192.168.1.75/course/api/api/')

commonApp.directive('datagrid', ['$http', 'baseUrl', function($http, baseUrl){
    return {
        restrict: 'E',
        templateUrl: 'datagrid.html',
        replace: true,
        link: function(scope, elment, attr){
            scope.dataset = [];
            console.log(2, scope)
            $http.get(baseUrl + attr.api).success(function(response){
                scope.dataset = response.data;
            })

            scope.myFilter = function(data){
                return data;
                // return searchFactory.search(data, $scope.username)
            }
        }
    }
}])

// dkApp.factory('searchFactory', function(){
//     return {
//         search: function(data, username){
//             if(username){
//                 if(data.username.indexOf(username) > -1){
//                     return data;
//                 }
//             } else {
//                 return data;   
//             }            
//         }
//     }
// })