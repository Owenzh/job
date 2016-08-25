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
                    $scope.$emit('loginSuccess', result.data.d);
                });
            }

        };

    })
    .controller('RegisterController', ['$scope', '$location', 'userSvc', function ($scope, $location, userSvc) {
        $scope.user = {};
        $scope.user.isNew = true;
        $scope.user.detail = null;
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
                //console.dir($scope.userInfo);
                if (dataObj.s == 1) {
                    angular.extend($scope.userInfo, dataObj.d);
                }
                //console.dir($scope.userInfo);
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
            console.log($scope.userInfo);
            userSvc.updateUserInfo($scope.userInfo, function (result) {
                $location.path("/center");
            });
        };

        initUserInfo();

    })
    .controller('JobItemController', function ($scope, $location) {

    }).controller('EnterpriseController', function ($scope, $location) {

    }).controller('PositionController', function ($scope, $location, $document, userSvc) {
        $scope.positionInfo = {};
        $scope.requiredArr = [];
        $scope.addRequired = function () {
            var r = $scope.positionInfo.p_required;
            if(r){
                $scope.requiredArr.push(r);
            }
            $scope.positionInfo.p_required = '';
        };
        $scope.removeRequiredItem = function(indx){
            $scope.requiredArr.splice(indx,1);//删除当前元素
        };
        $scope.addPositionInfo = function(){
            $scope.positionInfo.p_requirements = $scope.requiredArr;
            delete $scope.positionInfo.p_required;
            //console.dir($scope.positionInfo);
            console.dir($scope.userData);
            $scope.positionInfo.p_create_date = new Date().getTime();
            $scope.positionInfo.e_id = $scope.userData.id;
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
                if (dataObj.s == 1) {
                    $scope.enterpriseInfo = angular.copy(dataObj.d);
                } else {
                    console.log("userData");
                    $scope.enterpriseInfo = angular.copy($scope.userData);
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
                city.val($scope.userInfo.city);
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
            console.log($scope.enterpriseInfo);
            userSvc.updateEnterpriseInfo($scope.enterpriseInfo, function (result) {
                $location.path("/center");
            });
        };
        initEnterpriseInfo();
    });