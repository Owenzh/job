/**
 * Created by XZhang21 on 5/17/2016.
 */
angular.module('jobController', ['jobService']).controller('NavController', function ($scope) {
    $scope.headerText = {
        sys: 'ERS系统',
        index: '首页',
        enterprise: '公司',
        login: '登录',
        register: '注册'
    }
}).controller('LoginController', function ($scope, $location) {

}).controller('RegisterController', ['$scope','userSvc', function ($scope,userSvc) {

    $scope.init = function () {
        $scope.user = {};
        console.log('init register');
    };

    $scope.registerAction = function () {
        if (angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.password) || angular.isUndefined($scope.user.type) || angular.isUndefined($scope.user.policy)) {
            console.log("Need fill all inputs");
        } else {
            //Need register service to handle it.
            console.log("RegisterUser");
            userSvc.registerUser($scope.user);
        }

    };
    $scope.init();

}]).controller('JobItemController', function ($scope, $location) {

}).controller('EnterpriseController', function ($scope, $location) {

});