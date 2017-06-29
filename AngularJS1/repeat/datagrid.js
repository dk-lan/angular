var dkApp = angular.module('dkApp', []);

dkApp.factory('searchFactory', function(){
    return {
        search: function(data, username){
            if(username){
                if(data.username.indexOf(username) > -1){
                    return data;
                }
            } else {
                return data;   
            }            
        }
    }
})

dkApp.controller('dkController', ['$scope', '$http', 'searchFactory', function($scope, $http, searchFactory){
    // $scope.dataset = [{name: 'Tom', sex: 1, age: 18}, {name: 'Lucy', sex: 0, age: 28}];
    $scope.dataset = [];
    $http.get('http://192.168.1.75/course/api/api/student/FetchAllStudent').success(function(response){
        $scope.dataset = response.data;
    })

    $scope.myFilter = function(data){
        return searchFactory.search(data, $scope.username)
    }
}])


//testComponent.Vue
<template>
</template>
export default {
    data(){},
    created(){
        $.get()
    }
}