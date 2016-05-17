/**
 * Created by XZhang21 on 5/17/2016.
 */

angular.module('mainModel').controller('NavController', function ($scope) {
    $scope.headerText = {
        sys: 'ERS系统',
        index: '首页',
        enterprise: '公司',
        login: '登录',
        register: '注册'
    }
});