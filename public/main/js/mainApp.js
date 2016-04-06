/**
 * Created by Owen on 4/6/2016.
 */
var mainApp = angular.module('MainApp',[]);

//
mainApp.controller('NavCtrl',function($scope){
    $scope.headerText = {
        sys:'ERS系统',
        index:'首页',
        enterprise:'公司',
        login:'登录',
        register:'注册'
    }
});