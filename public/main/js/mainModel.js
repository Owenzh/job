/**
 * Created by Owen on 4/6/2016.
 */
var mainModel = angular.module('mainModel',['ngRoute']);
mainModel.config(function($routeProvider,$locationProvider){
    $locationProvider.html5Mode({
        enable:true,
        requireBase:false
    });
    $routeProvider.when('/index',{
        templateUrl:'/main/htmlviews/main.html'
    }).when('/enterprise',{
        templateUrl:'/main/htmlviews/enterprise.html'
    }).when('/login',{
        templateUrl:'/main/htmlviews/login.html'
    }).when('/register',{
        templateUrl:'/main/htmlviews/register.html'
    }).otherwise({
        templateUrl:'/main/htmlviews/main.html'
    });
}).controller('NavController',function($scope){
    $scope.headerText = {
        sys:'ERS系统',
        index:'首页',
        enterprise:'公司',
        login:'登录',
        register:'注册'
    }
});