/**
 * Created by Owen on 5/24/2016.
 */

var svc = angular.module('jobService', []);
svc.factory('userSvc', ['$http', '$location', function ($http, $location) {
    function registerUser(user) {
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
        console.log('registerUser SVC ' + user.email);
    }

    function loginUser(user) {
        var req = {
            method: 'GET',
            url: '/api/v1/user/' + user.email + '/' + user.password
        };
        $http(req).then(function successCallback(res) {
            console.log("login success :: "+res.data.s);
            console.dir(res);
            //go to index page
            if (res.data.s) {
                $location.path("/index");
                console.log("user: "+res.data.d);
            } else {
                $location.path("/login");
            }
        }, function errorCallback(res) {
            $location.path("/login");
            console.log("@Error@");
        });
        console.log('login SVC ' + user.email);
    }

    return {
        registerUser: registerUser,
        loginUser: loginUser
    };
}]);