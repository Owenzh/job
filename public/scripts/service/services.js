/**
 * Created by Owen on 5/24/2016.
 */

var svc = angular.module('jobService', []);
svc.factory('userSvc', ['$http', function ($http) {
    function registerUser(user) {
        var req = {
            method: 'POST',
            url: '/api/user',
            headers: {
                'Content-type': 'application/json'
            },
            data: JSON.stringify([user])
        };
        $http(req).then(function successCallback(res) {
            console.log(res);
        }, function errorCallback(res) {
            console.log("@Error@");
        });
        console.log('registerUser SVC ' + user.email);
    }

    return {registerUser: registerUser};
}]);