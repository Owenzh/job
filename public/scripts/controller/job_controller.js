/**
 * Created by XZhang21 on 5/17/2016.
 */
angular.module('jobController',[]).controller('NavController', function ($scope) {
    $scope.headerText = {
        sys: 'ERS系统',
        index: '首页',
        enterprise: '公司',
        login: '登录',
        register: '注册'
    }
}).controller('LoginController', function ($scope, $location) {
    $scope.register = function(){
        console.log("RegisterUser");
    }
}).controller('RegisterController', function ($scope, $location) {
    $scope.register = function(){
        console.log("RegisterUser");
    }
}).controller('JobItemController', function ($scope, $location) {
    $scope.register = function(){
        console.log("RegisterUser");
    }
}).controller('EnterpriseController', function ($scope, $location) {
    $scope.register = function(){
        console.log("RegisterUser");
    }
});