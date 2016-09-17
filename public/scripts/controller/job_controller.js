/**
 * Created by XZhang21 on 5/17/2016.
 */
angular.module('jobController', ['jobService']).controller('NavController', function ($scope) {
    $scope.headerText = {
        sys: 'ERS系统',
        index: '首页',
        enterprise: '公司',
        login: '登录',
        register: '注册',
        logout: '退出',
        center: '用户'
    };

})
    .controller('MainController', function ($scope, $location, userSvc) {
        console.log("MainController");
        $scope.allPositions = [];
        $scope.loadAllPositions = function(){
            userSvc.getAllPositions(function(data){
                if (data.s==0) {
                     console.log("No position found.");
                } else {
                    $scope.allPositions = data.d;
                }
            });
        };
        $scope.formatDate = function (timeStr) {
            //console.log(timeStr);
            var date = new Date(timeStr);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            return y + "-" + m + "-" + d;
        };
        $scope.loadAllPositions();
    })
    .controller('LoginController', function ($scope, $location, userSvc) {
        $scope.$emit('logoutUser', null);
        $scope.user = {};
        $scope.loginAction = function () {
            if (!(angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.password))) {
                userSvc.loginUser($scope.user, function (result) {
                    if (result.data.s) {
                        $location.path("/index");
                    } else {
                        $location.path("/login");
                    }
                    console.log("login user");
                    console.dir(result.data.d);
                    $scope.$emit('loginSuccess', result.data.d);
                });
            }

        };

    })
    .controller('RegisterController', ['$scope', '$location', 'userSvc', function ($scope, $location, userSvc) {
        var currentTime = new Date().getTime();
        $scope.user = {};
        $scope.user.isNew = true;
        $scope.user.info = null;
        $scope.user.createDate = currentTime;
        $scope.user.updateDate = currentTime;
        $scope.user.test = '中文测试';

        $scope.registerAction = function () {
            if (!(angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.password) || angular.isUndefined($scope.user.type) || angular.isUndefined($scope.user.policy))) {
                userSvc.registerUser($scope.user, function () {
                    $location.path("/login");
                });
            }

        };
    }])
    .controller('UserInfoController', function ($scope, $location, $document, userSvc) {
        function initUserInfo() {
            userSvc.getUserInfo({id: $scope.userData.id}, function (result) {
                var dataObj = result;
                $scope.userInfo = angular.copy($scope.userData);
                if (dataObj.s == 1) {
                    angular.extend($scope.userInfo, dataObj.d);
                }
                userSvc.loadAddress(initAddress);
            });
        }

        function initAddress(address) {
            $scope.addressJSON = address;
            $scope.loadProvince();
            $scope.loadCity();
            $scope.loadDistrict();
        }

        $scope.loadProvince = function () {
            var address = $scope.addressJSON;
            var province = $document.find("#province");
            province.html("");
            for (var i = 0; address[i]; i++) {
                province.append("<option>" + address[i]["name"] + "</option>");
            }
            province.val($scope.userInfo.province);
        };
        $scope.loadCity = function () {
            var address = $scope.addressJSON;
            var city = $document.find("#city");
            var district = $document.find("#district");
            city.html("");
            district.show();
            district.html('<option value="">请选择</option>');
            var province = $scope.userInfo.province;
            if (province != "") {
                for (var i = 1; address[i]; i++) {
                    if (province == address[i]["name"]) {
                        var cityArr = address[i]["sub"];
                        for (var j = 0; cityArr[j]; j++) {
                            city.append("<option>" + cityArr[j]["name"] + "</option>");
                        }
                    }
                }
                city.val($scope.userInfo.city);
            }
        };
        $scope.loadDistrict = function () {
            var address = $scope.addressJSON;
            var district = $document.find("#district");
            district.html('');
            var province = $scope.userInfo.province;
            var city = $scope.userInfo.city;
            if (province != "" && city != "") {
                for (var i = 1; address[i]; i++) {
                    if (province == address[i]["name"]) {
                        var cityArr = address[i]["sub"];
                        for (var j = 0; cityArr[j]; j++) {
                            if (city == cityArr[j]["name"]) {
                                var districtArr = cityArr[j]["sub"];
                                if (districtArr) {
                                    for (var k = 0; districtArr[k]; k++) {
                                        district.append("<option>" + districtArr[k]["name"] + "</option>");
                                    }
                                } else {
                                    district.hide();
                                }
                            }

                        }
                    }
                }
                district.val($scope.userInfo.district);
            }
        };
        $scope.updateUserInfo = function () {
            //console.log($scope.userInfo);
            userSvc.updateUserInfo($scope.userInfo, function (result) {
                $location.path("/center");
            });
        };

        initUserInfo();

    })
    .controller('JobItemController', function ($scope, $location) {

    }).controller('EnterpriseController', function ($scope, $location) {

    }).controller('PositionAddController', function ($scope, $location, $document, userSvc) {
        $scope.positionInfo = {};
        $scope.positionInfo.p_hired_count = "2";
        $scope.positionInfo.p_status = "1";
        $scope.requiredArr = [];
        $scope.addRequired = function () {
            var r = $scope.positionInfo.p_required;
            if (r) {
                $scope.requiredArr.push(r);
            }
            $scope.positionInfo.p_required = '';
        };
        $scope.removeRequiredItem = function (indx) {
            $scope.requiredArr.splice(indx, 1);//删除当前元素
        };
        $scope.addPositionInfo = function () {
            $scope.positionInfo.p_requirements = $scope.requiredArr;
            delete $scope.positionInfo.p_required;
            //console.dir($scope.positionInfo);
            console.dir($scope.userData);
            $scope.positionInfo.p_create_date = new Date().getTime();
            $scope.positionInfo.e_id = $scope.userData.id;
            $scope.positionInfo.e_name = $scope.userData.info.e_realName;
            $scope.positionInfo.e_city = $scope.userData.info.city;
            console.dir($scope.positionInfo);

            userSvc.addPosition([$scope.positionInfo], function (result) {
                $location.path("/center");
            });
        };
    })
    .controller('EnterpriseInfoController', function ($scope, $location, $document, userSvc) {
        function initEnterpriseInfo() {
            userSvc.getEnterpriseInfo({id: $scope.userData.id}, function (result) {
                var dataObj = result;
                $scope.enterpriseInfo = angular.copy($scope.userData);
                if (dataObj.s == 1) {
                    angular.extend($scope.enterpriseInfo, dataObj.d);
                }
                userSvc.loadAddress(initAddress);
                userSvc.loadCategory(initCategory);
            });
        }

        function initAddress(address) {
            $scope.addressJSON = address;
            $scope.loadProvince();
            $scope.loadCity();
            $scope.loadDistrict();
        }

        $scope.loadProvince = function () {
            var address = $scope.addressJSON;
            var province = $document.find("#province");
            province.html("");
            for (var i = 0; address[i]; i++) {
                province.append("<option>" + address[i]["name"] + "</option>");
            }
            province.val($scope.enterpriseInfo.province);
        };
        $scope.loadCity = function () {
            var address = $scope.addressJSON;
            var city = $document.find("#city");
            var district = $document.find("#district");
            city.html("");
            district.show();
            district.html('<option value="">请选择</option>');
            var province = $scope.enterpriseInfo.province;
            if (province != "") {
                for (var i = 1; address[i]; i++) {
                    if (province == address[i]["name"]) {
                        var cityArr = address[i]["sub"];
                        for (var j = 0; cityArr[j]; j++) {
                            city.append("<option>" + cityArr[j]["name"] + "</option>");
                        }
                    }
                }
                city.val($scope.enterpriseInfo.city);
            }
        };
        $scope.loadDistrict = function () {
            var address = $scope.addressJSON;
            var district = $document.find("#district");
            district.html('');
            var province = $scope.enterpriseInfo.province;
            var city = $scope.enterpriseInfo.city;
            if (province != "" && city != "") {
                for (var i = 1; address[i]; i++) {
                    if (province == address[i]["name"]) {
                        var cityArr = address[i]["sub"];
                        for (var j = 0; cityArr[j]; j++) {
                            if (city == cityArr[j]["name"]) {
                                var districtArr = cityArr[j]["sub"];
                                if (districtArr) {
                                    for (var k = 0; districtArr[k]; k++) {
                                        district.append("<option>" + districtArr[k]["name"] + "</option>");
                                    }
                                } else {
                                    district.hide();
                                }
                            }

                        }
                    }
                }
                district.val($scope.enterpriseInfo.district);
            }
        };
        function initCategory(category) {
            //console.dir(category);
            $scope.categoryJSON = category;
            $scope.loadCategory();
            $scope.loadCategorySub();
        }

        $scope.loadCategory = function () {
            var category = $scope.categoryJSON;
            var categoryHtml = $document.find("#e_businessCategoryMain");
            categoryHtml.html("");
            for (var i = 0; category[i]; i++) {
                categoryHtml.append('<option value="' + category[i]["short"] + '">' + category[i]["title"] + '</option>');
            }
            categoryHtml.val($scope.enterpriseInfo.e_businessCategoryMain);
        };
        $scope.loadCategorySub = function () {
            var category = $scope.categoryJSON;
            var main = $document.find("#e_businessCategoryMain");
            var sub = $document.find("#e_businessCategorySub");
            sub.html("");
            //sub.html('<option value="">请选择</option>');
            var main = $scope.enterpriseInfo.e_businessCategoryMain;
            if (main != "") {
                for (var i = 0; category[i]; i++) {
                    if (main == category[i]["short"]) {
                        var mainArr = category[i]["value"];
                        for (var j = 0; mainArr[j]; j++) {
                            sub.append('<option value="' + mainArr[j]["k"] + '">' + mainArr[j]["v"] + '</option>');
                        }
                    }
                }
                sub.val($scope.enterpriseInfo.e_businessCategorySub);
            }
        };
        $scope.updateEnterpriseInfo = function () {
            //console.log($scope.enterpriseInfo);
            userSvc.updateEnterpriseInfo($scope.enterpriseInfo, function (result) {
                $location.path("/center");
            });
        };
        initEnterpriseInfo();
    }).controller('PositionDetailController', function ($scope, $location, $document, $stateParams, userSvc) {
        console.log("PositionDetailController" + $stateParams.id);
        $scope.positionDetail = {};
        $scope.getPosition = function () {
            var p_id = $stateParams.id;
            userSvc.getPositionDetailByPID(p_id, function (data) {
                if (data.s == 0) {
                    console.log("Not data found!");
                } else {
                    $scope.positionDetail = data.d;
                    $scope.loadPositionDetail();
                }
            });
        };
        $scope.loadPositionDetail = function () {
            console.dir($scope.positionDetail);
        };
        $scope.getPosition();
    }).controller('PositionManageController', function ($scope, $location, $document, $state, userSvc) {
        //TODO
        //fun01-search position list under this enterprise
        //fun02- edit position
        //fun03- invalid/valid position
        //fun04- delete position
        $scope.positionArr = [];
        $scope.loadPosition = function () {
            var e_id = $scope.userData.id;
            userSvc.getPosition(e_id, function (data) {
                if (data.s == 0) {
                    console.log("Not data found!");
                } else {
                    $scope.positionArr = data.d;
                    $scope.initPositionTable();
                }
            });
        };
        $scope.initPositionTable = function () {
            console.dir($scope.positionArr);
        };
        $scope.goToDetail = function (id) {
            $state.go('center.position-detail', {id: id});
        };
        $scope.freezePosition = function (id) {
            console.log("freezePosition..." + id);
            userSvc.frozenPosition(id, function (data) {
                $state.reload();
            });
        };
        $scope.unfreezePosition = function (id) {
            console.log("unfreezePosition..." + id);
            userSvc.unfrozenPosition(id, function (data) {
                $state.reload();
            });
        };
        $scope.deletePosition = function (id) {
            console.log("deletePosition..." + id);
            userSvc.deletePositionByPID(id, function (data) {
                if (data.s == 0) {
                    console.log("Delete position error!");
                } else {
                    console.log("Delete position success!");
                    $state.reload();
                }
            });
        };
        $scope.formatDate = function (timeStr) {
            //console.log(timeStr);
            var date = new Date(timeStr);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            return y + "-" + m + "-" + d;
        };
        $scope.loadPosition();

    }).controller('PositionBookController', function ($scope, $location, $document, userSvc) {
        function initCategory(category) {
            console.dir(category);
            $scope.categoryJSON = category;
            $scope.loadCategory();
            $scope.loadCategorySub();
        }

        $scope.loadCategory = function () {
            var category = $scope.categoryJSON;
            var categoryHtml = $document.find("#e_businessCategoryMain");
            categoryHtml.html("");
            for (var i = 0; category[i]; i++) {
                categoryHtml.append('<option value="' + category[i]["short"] + '">' + category[i]["title"] + '</option>');
            }
            categoryHtml.val($scope.bookInfo.e_businessCategoryMain);
        };
        $scope.loadCategorySub = function () {
            var category = $scope.categoryJSON;
            var main = $document.find("#e_businessCategoryMain");
            var sub = $document.find("#e_businessCategorySub");
            sub.html("");
            //sub.html('<option value="">请选择</option>');
            var main = $scope.bookInfo.e_businessCategoryMain;
            if (main != "") {
                for (var i = 0; category[i]; i++) {
                    if (main == category[i]["short"]) {
                        var mainArr = category[i]["value"];
                        for (var j = 0; mainArr[j]; j++) {
                            sub.append('<option value="' + mainArr[j]["k"] + '">' + mainArr[j]["v"] + '</option>');
                        }
                    }
                }
                sub.val($scope.bookInfo.e_businessCategorySub);
            }
        };
        function init() {
            $scope.bookInfo = {};
            userSvc.loadCategory(initCategory);
        }

        init();
    });