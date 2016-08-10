/**
 * Created by Owen on 5/24/2016.
 */

var svc = angular.module('jobService', ['$scope','angular-md5']);
svc.factory('userSvc', ['$http', '$location', 'md5','$scope', function ($http, $location, md5, $scope) {

    function registerUser(user) {
        user.password = md5.createHash(user.password);
        var req = {
            method: 'POST',
            url: '/api/v1/user',
            headers: {
                'Content-type': 'application/json'
            },
            data: JSON.stringify([user])
        };
        $http(req).then(function successCallback(res) {
            console.log("register success");
            //go to login page
            $location.path("/login");
        }, function errorCallback(res) {
            console.log("@Error@");
        });
    }

    function loginUser(user) {
        var req = {
            method: 'GET',
            url: '/api/v1/user/' + user.email + '/' + md5.createHash(user.password)
        };
        return $http(req).then(function successCallback(res) {
            console.log("login success :: " + res.data.s);
            console.dir(res);
            //go to index page
            if (res.data.s) {
                $location.path("/index");
                console.log("user: " + res.data.d);
            } else {
                $location.path("/login");
            }
            return {data: res.data.d};
        }, function errorCallback(res) {
            $location.path("/login");
            console.log("@Error@");
            return {data: res.data.d};
        });
    }

    function loadAddress() {
        var req = {
            method: 'GET',
            url: '/api/v1/address'
        };
        return $http(req).then(function successCallback(res) {
            console.log("address success :: " + res.data.s);
            //console.dir(res);
            if (res.data.s) {
                console.log("address: " + res.data.d);
            }
            $scope.$emit('addressReady', res.data.d);
            return {data: res.data.d};
        }, function errorCallback(res) {
            return {data: res.data.d};
        });
    }

    return {
        registerUser: registerUser,
        loginUser: loginUser,
        loadAddress: loadAddress
    };
}]);
