var userControllers = angular.module('UserController', []);

userControllers.controller('AddUserController',function($scope){
    $scope.title = "新增用户";
    /*
    $scope.init = function(){
        $("#btn_add_user1").on("click",function(){
            console.log("reg btn");
        });
    }
*/
    //$scope.init();
});