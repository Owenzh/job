/**
 * Created by Owen on 4/6/2016.
 */
angular.module('jobApp', ['ui.router', 'jobController']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("index", {  //路由状态
            url: "/index",  //路由路径
            templateUrl: "/ui/index/main.html"  //路由填充的模板
        })
        .state("enterprise", {
            url: "/enterprise",
            templateUrl: '/ui/index/enterprise.html',
            controller: 'EnterpriseController as enterprise'
        })
        .state("login", {
            url: "/login",
            templateUrl: '/ui/index/login.html',
            controller: 'LoginController as login'
        })
        .state("logout", {
            url: "/logout",
            templateUrl: '/ui/index/login.html',
            controller: 'LogoutController as logout'
        })
        .state("register", {
            url: "/register",
            templateUrl: '/ui/index/register.html',
            controller: 'RegisterController as register'
        })
        .state("center", {
            url: "/center",
            templateUrl: '/ui/index/center.html',
            controller: 'CenterController as center'
        }).state("center.user-info", {//user
            url: "/user-info",
            templateUrl: '/ui/user/ct_u_user_info.html'
        }).state("center.resume-center", {
            url: "/resume-center",
            templateUrl: '/ui/user/ct_u_resume_center.html'
        }).state("center.position-request", {
            url: "/position-request",
            templateUrl: '/ui/user/ct_u_position_request.html'
        }).state("center.position-collection", {
            url: "/position-collection",
            templateUrl: '/ui/user/ct_u_position_collection.html'
        }).state("center.position-book", {
            url: "/position-book",
            templateUrl: '/ui/user/ct_u_position_book.html'
        }).state("center.user-msg-box", {
            url: "/user-msg-box",
            templateUrl: '/ui/user/ct_u_user_msg_box.html'
        }).state("center.user-setting", {
            url: "/user-setting",
            templateUrl: '/ui/user/ct_u_user_setting.html'
        }).state("center.enterprise-info", {//enterprise
            url: "/enterprise-info",
            templateUrl: '/ui/enterprise/ct_e_enterprise_info.html'
        }).state("center.position-add", {
            url: "/position-add",
            templateUrl: '/ui/enterprise/ct_e_position_add.html'
        }).state("center.position-manage", {
            url: "/position-manage",
            templateUrl: '/ui/enterprise/ct_e_position_manage.html'
        }).state("center.position", {
            url: "/position",
            templateUrl: '/ui/enterprise/ct_e_center_position.html'
        }).state("center.job-hunters", {
            url: "/job-hunters",
            templateUrl: '/ui/enterprise/ct_e_job_hunters.html'
        }).state("center.talent-search", {
            url: "/talent-search",
            templateUrl: '/ui/enterprise/ct_e_talent_search.html'
        }).state("center.enterprise-msg-box", {
            url: "/enterprise-msg-box",
            templateUrl: '/ui/enterprise/ct_e_enterprise_msg_box.html'
        }).state("center.enterprise-setting", {
            url: "/enterprise-setting",
            templateUrl: '/ui/enterprise/ct_e_enterprise_setting.html'
        }).state("privacy", {
            url: "/privacy",
            templateUrl: '/ui/index/privacy.html'
        })
    $urlRouterProvider.otherwise("/index");
}]).controller('appController', ['$rootScope','$scope', '$timeout', '$window', function ($rootScope,$scope, $timeout, $window) {

    $scope.checkUserLogin = function () {
        var storage = $window.localStorage;
        var local_user = storage.getItem("ers_user");
        if (local_user && local_user.indexOf("#") != -1) {
            $scope.isUserLogin = true;
        } else {
            $scope.isUserLogin = false;
        }
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
        $rootScope.userData = user;
        (user.type == 1) ? $scope.isPersonalUser = true : $scope.isPersonalUser = false;
        var userStr = user._id + "#" + user.email + "#" + user.password + "#" + user.type;
        $scope.updateLocalUser(userStr);
    });
    $scope.$on('logoutUser', function (event, args) {
        $scope.removeLocalUser();
        $scope.isUserLogin = false;
    });
    $scope.checkUserLogin();

}]);