/**
 * Created by Owen on 5/24/2016.
 */

var svc = angular.module('jobService', []);
svc.factory('userSvc', ['$http', function ($http) {
    function registerUser(user) {
        console.log('registerUser SVC '+user.email);
    }

    return {registerUser: registerUser};
}]);