/**
 * Created by Owen on 4/6/2016.
 */
angular.module('jobApp', ['ngRoute', 'jobController']).config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enable: true,
        requireBase: false
    });
    $routeProvider.when('/index', {
        templateUrl: '/ui/index/main.html'
    }).when('/job_item', {
        templateUrl: '/ui/index/job_item.html',
        controller: 'JobItemController as jobItem'
    }).when('/enterprise', {
        templateUrl: '/ui/index/enterprise.html',
        controller: 'EnterpriseController as enterprise'
    }).when('/login', {
        templateUrl: '/ui/index/login.html',
        controller: 'LoginController as login'
    }).when('/logout', {
        templateUrl: '/ui/index/login.html',
        controller: 'LogoutController as logout'
    }).when('/register', {
        templateUrl: '/ui/index/register.html',
        controller: 'RegisterController as register'
    }).when('/setting', {
        templateUrl: '/ui/index/setting.html',
        controller: 'SettingController as setting'
    }).when('/privacy', {
        templateUrl: '/ui/index/privacy.html'
    }).otherwise({
        templateUrl: '/ui/index/main.html'
    });
}).controller('appController', ['$scope', '$timeout', '$window', function ($scope, $timeout, $window) {

    $scope.checkUserLogin = function () {
        var storage = $window.localStorage;
        var local_user = storage.getItem("ers_user");
        if (local_user && local_user.indexOf("#") != -1) {
            $scope.isUserLogin = true;
        } else {
            $scope.isUserLogin = false;
        }
        console.log("local_user==" + local_user);
    };
    $scope.updateLocalUser = function (userStr) {
        var storage = $window.localStorage;
        storage.setItem("ers_user", userStr);
    };
    $scope.removeLocalUser = function () {
        var storage = $window.localStorage;
        storage.removeItem("ers_user");
    };
    $scope.$on('loginSuccess', function (event, args) {
        console.dir(args.data);
        var user = args.data[0];
        $scope.isUserLogin = true;
        var userStr = user._id + "#" + user.email;
        $scope.updateLocalUser(userStr);
    });
    $scope.$on('logoutUser', function (event, args) {
        $scope.removeLocalUser();
        $scope.isUserLogin = false;
    });
    $scope.checkUserLogin();

}]);