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
                    'Content-type': 'application/json;charset=utf-8'
                };
                request.data = angular.toJson(config.data);
                break;
            case "PUT":
                request.method = 'PUT';
                request.url = config.url;
                request.headers = {
                    'Content-type': 'application/json;charset=utf-8'
                };
                request.data = (angular.toJson(config.data));
                break;
            case "DELETE":
                request.method = 'DELETE';
                request.url = config.url;
                request.headers = {
                    'Content-type': 'application/json;charset=utf-8'
                };
                request.data = (angular.toJson(config.data));
                break;
        }
        return request;
    }
    function encodeParameters(obj){
        var _tmp = obj;
        for(var i in _tmp){
            _tmp[i] = encodeURIComponent(_tmp[i]);
            //_tmp[i] = escape(_tmp[i]);
        }
        return _tmp;
    }
    function registerUser(user, callback) {
        user.password = md5.createHash(user.password);
        var req = mapRequest("POST", {url: '/api/v1/user', data: [user]});
        console.dir(user);
        
        $http(req).then(function successCallback(res) {
            callback && callback();
        }, function errorCallback(res) {
            console.error("[registerUser] error");
        });
    }

    function loginUser(user, callback) {
        var _url = '/api/v1/user/' + user.email + '/' + md5.createHash(user.password);
        var req = mapRequest('GET', {url: _url});
        return $http(req).then(function successCallback(res) {
            callback && callback(res);
        }, function errorCallback(res) {
            console.error("[loginUser] error");
        });
    }

    function loadAddress(callback) {
        var req = mapRequest('GET', {url: '/api/v1/address'});
        return $http(req).then(function successCallback(res) {
            if (res.data.s) {
                callback(res.data.d);
            }
        }, function errorCallback(res) {
            console.error("[loadAddress] error");
        });
    }
    function loadCategory(callback) {
        var req = mapRequest('GET', {url: '/api/v1/category'});
        return $http(req).then(function successCallback(res) {
            if (res.data.s) {
                callback(res.data.d);
            }
        }, function errorCallback(res) {
            console.error("[loadCategory] error");
        });
    }

    function getUserInfo(data, callback) {
        var _url = '/api/v1/user_info/' + data.id;
        var req = mapRequest('GET', {url: _url});
        return $http(req).then(function successCallback(res) {
            callback && callback(res.data);
        }, function errorCallback(res) {
            console.error("[getUserInfo] error");
        });
    }

    function updateUserInfo(data, callback) {
        var req = mapRequest('PUT', {url: '/api/v1/user_info', data: data});
        return $http(req).then(function successCallback(res) {
            callback && callback(res.data);
        }, function errorCallback(res) {
            console.error("[updateUserInfo] error");
        });
    }

    function getEnterpriseInfo(data, callback) {
        var _url = '/api/v1/enterprise_info/' + data.id;
        var req = mapRequest('GET', {url: _url});
        return $http(req).then(function successCallback(res) {
            callback && callback(res.data);
        }, function errorCallback(res) {
            console.error("[getEnterpriseInfo] error");
        });
    }

    function updateEnterpriseInfo(data, callback) {
        var req = mapRequest('PUT', {url: '/api/v1/enterprise_info', data: data});
        return $http(req).then(function successCallback(res) {
            callback && callback(res.data);
        }, function errorCallback(res) {
            console.error("[updateEnterpriseInfo] error");
        });
    }
    function addPositionInfo(data,callback){
        var req = mapRequest('POST', {url: '/api/v1/position', data: data});
        return $http(req).then(function successCallback(res) {
            callback && callback(res.data);
        }, function errorCallback(res) {
            console.error("[addPositionInfo] error");
        });
    }


    function getPositionInfo(eid, callback) {
        var _url = '/api/v1/position/' + eid;
        var req = mapRequest('GET', {url: _url});
        return $http(req).then(function successCallback(res) {
            callback && callback(res.data);
        }, function errorCallback(res) {
            console.error("[getPositionInfo] error");
        });
    }

    function getPositionInfoByPID(pid, callback) {
        var _url = '/api/v1/position_detail/' + pid;
        var req = mapRequest('GET', {url: _url});
        return $http(req).then(function successCallback(res) {
            callback && callback(res.data);
        }, function errorCallback(res) {
            console.error("[getPositionInfoByPID] error");
        });
    }
    function deletePositionByPID(pid, callback) {
        var _url = '/api/v1/position/' + pid;
        var req = mapRequest('DELETE', {url: _url});
        return $http(req).then(function successCallback(res) {
            callback && callback(res);
        }, function errorCallback(res) {
            console.error("[deletePositionByPID] error");
        });
    }
    return {
        registerUser: registerUser,
        loginUser: loginUser,
        loadAddress: loadAddress,
        updateUserInfo: updateUserInfo,
        getUserInfo: getUserInfo,
        updateEnterpriseInfo: updateEnterpriseInfo,
        getEnterpriseInfo: getEnterpriseInfo,
        loadCategory: loadCategory,
        addPosition: addPositionInfo,
        getPosition: getPositionInfo,
        getPositionDetailByPID: getPositionInfoByPID,
        deletePositionByPID: deletePositionByPID
    };
}]);
