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
        .state("setting", {
            url: "/setting",
            templateUrl: '/ui/index/setting.html',
            controller: 'SettingController as setting'
        }).state("setting.userInfo", {
            url: "/user_info",
            templateUrl: '/ui/index/setting_user_info.html'
            //controller: 'SettingController as setting'
        }).state("setting.position", {
            url: "/position",
            templateUrl: '/ui/index/setting_position.html'
            //controller: 'SettingController as setting'
        })
        .state("privacy", {
            url: "/privacy",
            templateUrl: '/ui/index/privacy.html'
        })
    $urlRouterProvider.otherwise("/index");
}]).controller('appController', ['$scope', '$timeout', '$window', function ($scope, $timeout, $window) {

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