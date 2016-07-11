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
        logout: '登出',
        setting: '个人中心'
    };

}).controller('LoginController', function ($scope, userSvc) {
    $scope.init = function () {
        $scope.user = {};
        console.log('init login ');
    };

    $scope.loginAction = function () {
        var key = $scope.appKey;
        //console.dir(key);
        console.log('appkey == ' + key);
        $scope.user.key = key;
        if (angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.password)) {
            console.log("Need fill all inputs");
        } else {
            //Need register service to handle it.
            userSvc.loginUser($scope.user).then(function (result) {
                console.dir(result);
                $scope.$emit('loginSuccess', result)
                //$scope.isUserLogin = true;
            });
        }

    };
    $scope.init();


}).controller('RegisterController', ['$scope', 'userSvc', function ($scope, userSvc) {

    $scope.init = function () {
        $scope.user = {};
        console.log('init register ' + $scope.TestApp + "##" + $scope.APPK);
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