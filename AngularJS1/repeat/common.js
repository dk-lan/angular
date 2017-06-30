var commonApp = angular.module('commonApp', []);

commonApp.value('baseUrl', 'http://192.168.1.75/course/api/api/')

commonApp.value('lan', function(){
    var lan = window.localStorage.getItem("lan");
    if(!lan){
        lan = "cn";
    }
    window.localStorage.setItem("lan", lan);
    return lan;
})

commonApp.directive('datagrid', ['$http', 'baseUrl', 'lan', function($http, baseUrl, lan){
    return {
        restrict: 'E',
        templateUrl: 'datagrid.html',
        replace: true,
        link: function(scope, elment, attr){
            scope.dataset = [];
            console.log(2, scope)
            
            $http.get(baseUrl + attr.api).success(function(response){
                scope.dataset = response.data;
                $http.get('commonDictionary.txt').success(function(response){
                    scope.commonDictionary = response;
                    if(attr.dictionary){
                        $http.get(attr.dictionary).success(function(response){
                            scope.commonDictionary = Object.assign({}, scope.commonDictionary, response);
                            // console.log(scope.commonDictionary);
                        })
                    }                    
                })                
            })

            scope.lan = lan();
            scope.cols = attr.columns ? attr.columns.split(',') : [];

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