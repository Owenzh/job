/**
 * Created by Owen on 4/6/2016.
 */
angular.module('mainModel', ['ngRoute']).config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enable: true,
        requireBase: false
    });
    $routeProvider.when('/index', {
        templateUrl: '/ui/index/main.html'
    }).when('/job_item', {
        templateUrl: '/ui/index/job_item.html',
        controller:'JobItemController'
    }).when('/enterprise', {
        templateUrl: '/ui/index/enterprise.html',
        controller:'EnterpriseController'
    }).when('/login', {
        templateUrl: '/ui/index/login.html',
        controller:'LoginController'
    }).when('/register', {
        templateUrl: '/ui/index/register.html',
        controller:'RegisterController'
    }).when('/privacy', {
        templateUrl: '/ui/index/privacy.html'
    }).otherwise({
        templateUrl: '/ui/index/main.html'
    });
});