/**
 * Created by XZhang21 on 5/17/2016.
 */
angular.module('jobController', ['jobService']).controller('NavController', function ($scope) {
    $scope.headerText = {
        sys: 'ERS系统',
        index: '首页',
        enterprise: '公司',
        login: '登录',
        register: '注册',
        logout: '退出',
        center: '用户'
    };

}).controller('LoginController', function ($scope, userSvc) {
    $scope.init = function () {
        $scope.user = {};
        console.log('init login ');
    };

    $scope.loginAction = function () {
        if (angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.password)) {
            console.log("Need fill all inputs");
        } else {
            //Need register service to handle it.
            userSvc.loginUser($scope.user).then(function (result) {
                //console.dir(result);
                $scope.$emit('loginSuccess', result);
            });
        }

    };
    $scope.init();


}).controller('LogoutController', function ($scope, userSvc) {
    $scope.$emit('logoutUser', null);
    $scope.init = function () {
        $scope.user = {};
        console.log('init login ');
    };

    $scope.loginAction = function () {
        if (angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.password)) {
            console.log("Need fill all inputs");
        } else {
            //Need register service to handle it.
            userSvc.loginUser($scope.user).then(function (result) {
                //console.dir(result);
                $scope.$emit('loginSuccess', result);
            });
        }

    };
    $scope.init();

}).controller('RegisterController', ['$scope', 'userSvc', function ($scope, userSvc) {

    $scope.init = function () {
        $scope.user = {};
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

}]).controller('CenterController', function ($scope, $location) {
    console.log($scope.userData);

}).controller('UserInfoController', function ($scope, $location) {
    //console.log($scope.userData);
    $scope.init = function () {
        $scope.userInfo = {};
    };

    $scope.updateUserInfo = function(){
        console.log($scope.userInfo);
    }

}).controller('JobItemController', function ($scope, $location) {

}).controller('EnterpriseController', function ($scope, $location) {

});