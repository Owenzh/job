var mainApp = angular.module("mainApp", ['ngRoute', 'UserController']);

mainApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/adduser', {
                templateUrl: 'templates/admin/admin_user.html',
                controller: 'AddUserController'
            })
    }]).controller('mainController', function ($scope, $location) {
        var sidebar_yb = [
            {id: "a_yb", link: "#", icon: "&#xe601;", text: "仪表", active: true},
            {id: "a_tj", link: "#/any", icon: "&#xe63c;", text: "统计分析", active: false},
            {id: "a_xt", link: "#/system", icon: "&#xe63b;", text: "系统设置", active: false}
        ];
        var sidebar_user = [
            {id: "a_xz_yh", link: "#/adduser", icon: "&#xe609;", text: "新增用户", active: false},
            {id: "a_gl_yh", link: "#/manageruser", icon: "&#xe63c;", text: "管理用户", active: false},
            {id: "a_xg_yh", link: "#/updateuser", icon: "&#xe63b;", text: "修改用户权限", active: false}
        ];
        var sidebar_cat = [
            {id: "a_cx_hxr", link: "#/searchcat", icon: "&#xe605;", text: "查询候选人", active: false},
            {id: "a_xz_hxr", link: "#/addcat", icon: "&#xe609;", text: "新增候选人", active: false},
            {id: "a_gl_hxr", link: "#/managercat", icon: "&#xe63c;", text: "管理候选人", active: false}
        ];
        var sidebar_pos = [
            {id: "a_cx_zw", link: "#/searchpos", icon: "&#xe605;", text: "查询职位", active: false},
            {id: "a_xz_zw", link: "#/addpos", icon: "&#xe609;", text: "新增职位", active: false},
            {id: "a_gx_zw", link: "#/updatepos", icon: "&#xe649;", text: "更新职位", active: false},
            {id: "a_sc_zw", link: "#/delpos", icon: "&#xe648;", text: "删除职位", active: false}
        ];
        var sidebar_apy = [
            {id: "a_cx_sq", link: "#/searchapy", icon: "&#xe605;", text: "查询职位申请", active: false},
            {id: "a_gx_sq", link: "#/updateapy", icon: "&#xe649;", text: "更新职位申请", active: false},
            {id: "a_sc_sq", link: "#/delapy", icon: "&#xe648;", text: "删除职位申请", active: false}
        ];

        $scope.sideYb = sidebar_yb;
        $scope.sideUser = sidebar_user;
        $scope.sideCat = sidebar_cat;
        $scope.sidePos = sidebar_pos;
        $scope.sideApy = sidebar_apy;

        $scope.changeActive = function (_id) {
            for (var i = 0; sidebar_yb[i]; i++) {
                if (sidebar_yb[i]["id"] == _id) {
                    sidebar_yb[i]["active"] = true;
                } else {
                    sidebar_yb[i]["active"] = false;
                }
            }
            for (var i = 0; sidebar_user[i]; i++) {
                if (sidebar_user[i]["id"] == _id) {
                    sidebar_user[i]["active"] = true;
                } else {
                    sidebar_user[i]["active"] = false;
                }
            }
            for (var i = 0; sidebar_cat[i]; i++) {
                if (sidebar_cat[i]["id"] == _id) {
                    sidebar_cat[i]["active"] = true;
                } else {
                    sidebar_cat[i]["active"] = false;
                }
            }
            for (var i = 0; sidebar_pos[i]; i++) {
                if (sidebar_pos[i]["id"] == _id) {
                    sidebar_pos[i]["active"] = true;
                } else {
                    sidebar_pos[i]["active"] = false;
                }
            }
            for (var i = 0; sidebar_apy[i]; i++) {
                if (sidebar_apy[i]["id"] == _id) {
                    sidebar_apy[i]["active"] = true;
                } else {
                    sidebar_apy[i]["active"] = false;
                }
            }
        }
        var allConfigArr = [sidebar_yb, sidebar_user, sidebar_cat, sidebar_pos, sidebar_apy];
        var activeHash = "#" + $location.url();
        if (activeHash != "") {
            for (var i = 0; allConfigArr[i]; i++) {
                for (var j = 0; allConfigArr[i][j]; j++) {
                    if (allConfigArr[i][j]["link"] == activeHash) {
                        $scope.changeActive(allConfigArr[i][j]["id"]);
                        break;
                    }
                }
            }
        }
        //$scope.changeActive("a_yb");
    }//end function
);

mainApp.filter("trusted", function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }
});