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
    }).when('/register', {
        templateUrl: '/ui/index/register.html',
        controller: 'RegisterController as register'
    }).when('/privacy', {
        templateUrl: '/ui/index/privacy.html'
    }).otherwise({
        templateUrl: '/ui/index/main.html'
    });
}).controller('appController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.appKey = document.getElementById("appkey").value;
    $scope.isUserLogin = false;
    console.log("$scope.appKey==" + $scope.appKey);
    $scope.$on('loginSuccess', function (args) {
        console.dir(args);
        $scope.isUserLogin = true;
    });
}]);