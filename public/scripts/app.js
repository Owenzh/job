/**
 * Created by Owen on 4/6/2016.
 */
angular.module('jobApp', ['ngAnimate', 'ui.router', 'jobController']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("index", {  //路由状态
            url: "/index",  //路由路径
            templateUrl: "/ui/index/main.html",  //路由填充的模板
            controller: 'MainController'
            //views: {
            //    "positionList": {
            //        templateUrl: '/ui/index/center_u.html',
            //        controller: 'MainController'
            //    },
            //    "positionDetail": {
            //        templateUrl: '/ui/index/center_e.html',
            //        controller: 'MainPositionController'
            //    }
            //}
        })
        .state("enterprise", {
            url: "/enterprise",
            templateUrl: '/ui/index/enterprise.html',
            controller: 'EnterpriseController as Enterprise'
        })
        .state("login", {
            url: "/login",
            templateUrl: '/ui/index/login.html',
            controller: 'LoginController as Login'
        })
        .state("logout", {
            url: "/logout",
            templateUrl: '/ui/index/login.html',
            controller: 'LoginController as Login'
        })
        .state("register", {
            url: "/register",
            templateUrl: '/ui/index/register.html',
            controller: 'RegisterController as Register'
        })
        .state("position-detail", {
            url: "/position-detail/:id",
            templateUrl: '/ui/index/position_detail.html',
            controller: 'MainPositionController'
        })
        .state("center", {
            url: "/center",
            views: {
                "user": {templateUrl: '/ui/index/center_u.html'},
                "enterprise": {templateUrl: '/ui/index/center_e.html'}
            }
        }).state("center.user-info", {//user
            url: "/user-info/",
            templateUrl: '/ui/user/ct_u_user_info.html',
            controller: 'UserInfoController'
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
            templateUrl: '/ui/user/ct_u_position_book.html',
            controller: 'PositionBookController'
        }).state("center.user-msg-box", {
            url: "/user-msg-box",
            templateUrl: '/ui/user/ct_u_user_msg_box.html'
        }).state("center.user-setting", {
            url: "/user-setting",
            templateUrl: '/ui/user/ct_u_user_setting.html'
        }).state("center.enterprise-info", {//enterprise
            url: "/enterprise-info",
            templateUrl: '/ui/enterprise/ct_e_enterprise_info.html',
            controller: 'EnterpriseInfoController'
        }).state("center.position-add", {
            url: "/position-add",
            templateUrl: '/ui/enterprise/ct_e_position_add.html',
            controller: 'PositionAddController'
        }).state("center.position-manage", {
            url: "/position-manage",
            templateUrl: '/ui/enterprise/ct_e_position_manage.html',
            controller: 'PositionManageController'
        }).state("center.position-detail", {
            url: "/position-detail/:id",
            templateUrl: '/ui/enterprise/ct_e_position_detail.html',
            controller: 'PositionDetailController'
        }).state("center.position", {
            url: "/position",
            templateUrl: '/ui/enterprise/ct_e_center_position.html'
        }).state("center.job-hunters", {
            url: "/job-hunters",
            templateUrl: '/ui/enterprise/ct_e_job_hunters.html',
            controller: 'PositionRequestController'
        }).state("center.position-request-detail", {
            url: "/position-request-detail/:id",
            templateUrl: '/ui/enterprise/ct_e_position_request.html',
            controller: 'PositionRequestDetailController'
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
}]).controller('appController', ['$rootScope', '$scope', '$timeout', '$window',
    function ($rootScope, $scope, $timeout, $window) {
        $rootScope.mainType = "positionList";
        $scope.checkUserLogin = function () {
            var storage = $window.localStorage;
            var local_user = storage.getItem("ers_user");
            var local_user_info = storage.getItem("ers_user_info");
            if (local_user && local_user.indexOf("#") != -1) {
                $scope.isUserLogin = true;
                $scope.updateUserForApp(local_user, angular.fromJson(local_user_info));
            } else {
                $scope.isUserLogin = false;
                $rootScope.userType = "unknown";
            }
        };
        $scope.synLocalUser = function (newUserData) {
            var storage = $window.localStorage;
            var userStr = storage.getItem("ers_user").toString();
            var info = newUserData.info;
            for (var t in info) {
                info[t] = newUserData[t];
            }
            storage.setItem("ers_user_info", angular.toJson(info));
            $scope.updateUserForApp(userStr, info);
            console.dir($rootScope.userData);
        };
        $scope.updateLocalUser = function (userStr, info) {
            var storage = $window.localStorage;
            storage.setItem("ers_user", userStr);
            storage.setItem("ers_user_info", angular.toJson(info));
            $scope.updateUserForApp(userStr, info);
        };
        $scope.updateUserForApp = function (userStr, info) {
            var userArr = userStr.split("#");
            var user = {};
            if (userArr.length > 0) {
                user.id = userArr[0];
                user.email = userArr[1];
                user.password = userArr[2];
                user.type = userArr[3];
                user.typeName = userArr[3] == 1 ? '求职者' : '企业';
            }
            if (user.type == 1) {
                $rootScope.userType = "user";
                $rootScope.canRequest = "1";
            } else {
                $rootScope.userType = "enterprise";
                $rootScope.canRequest = "0";
            }
            user.info = info;
            $rootScope.userData = user;
        };
        $scope.removeLocalUser = function () {
            var storage = $window.localStorage;
            storage.removeItem("ers_user");
            storage.removeItem("ers_user_info");
            $rootScope.userData = null;
        };
        $scope.$on('loginSuccess', function (event, data) {
            var user = data[0];
            $scope.isUserLogin = true;
            var userStr = user._id + "#" + user.email + "#" + user.password + "#" + user.type;
            $scope.updateLocalUser(userStr, user.info);

        });
        $scope.$on('logoutUser', function (event, args) {
            $scope.removeLocalUser();
            $scope.isUserLogin = false;
        });
        $scope.$on('updateUser', function (event, data) {
            $scope.synLocalUser(data);
        });
        $scope.checkUserLogin();

    }]);