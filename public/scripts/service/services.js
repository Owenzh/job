/**
 * Created by Owen on 5/24/2016.
 */

var svc = angular.module('jobService', ['angular-md5']);
svc.factory('userSvc', ['$http', '$location', 'md5', function ($http, $location, md5) {
    function mapRequest(method, config) {
        var request = {};
        method = String(method).toUpperCase();
        switch (method) {
            case "GET":
                request.method = 'GET';
                request.url = config.url;
                break;

            case "POST":
                request.method = 'POST';
                request.url = config.url;
                request.headers = {
                    'Content-type': 'application/json'
                };
                request.data = angular.toJson(config.data);
                break;
            case "PUT":
                request.method = 'PUT';
                request.url = config.url;
                request.headers = {
                    'Content-type': 'application/json'
                };
                request.data = angular.toJson(config.data);
                break;
        }
        return request;
    }

    function registerUser(user) {
        user.password = md5.createHash(user.password);
        var req = mapRequest("POST", {url: '/api/v1/user', data: [user]});
        $http(req).then(function successCallback(res) {
            console.log("register success");
            //go to login page
            $location.path("/login");
        }, function errorCallback(res) {
            console.log("@Error@");
        });
    }

    function loginUser(user) {
        var _url = '/api/v1/user/' + user.email + '/' + md5.createHash(user.password);
        var req = mapRequest('GET', {url: _url});
        return $http(req).then(function successCallback(res) {
            //go to home page
            if (res.data.s) {
                $location.path("/index");
            } else {
                $location.path("/login");
            }
            return {data: res.data.d};
        }, function errorCallback(res) {
            $location.path("/login");
            return {data: res.data.d};
        });
    }

    function loadAddress(callback) {
        var req = mapRequest('GET', {url: '/api/v1/address'});
        return $http(req).then(function successCallback(res) {
            console.log("address success :: " + res.data.s);
            if (res.data.s) {
                callback(res.data.d);
            }
        });
    }

    function getUserInfo(data, callback) {
        var _url = '/api/v1/user/info/' + data.id;
        var req = mapRequest('GET', {url: _url});
        return $http(req).then(function successCallback(res) {
            //if (res.data.s) {
                console.log("get user info success.");
                callback && callback(res.data);
            //}
        }, function errorCallback(res) {

        });
    }

    function updateUserInfo(data, callback) {
        var req = mapRequest('PUT', {url: '/api/v1/user/info', data: data});
        return $http(req).then(function successCallback(res) {
            console.log("updateUserInfo success :: " + res.data.s);
            callback && callback(res.data);
        }, function errorCallback(res) {
            console.log(res.data.s);
        });
    }

    return {
        registerUser: registerUser,
        loginUser: loginUser,
        loadAddress: loadAddress,
        updateUserInfo: updateUserInfo,
        getUserInfo: getUserInfo
    };
}]);
