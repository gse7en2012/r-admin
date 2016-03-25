/**
 * Alerts Controller
 */

angular.module('RDash').controller('AlertsCtrl', ['$scope','$http', AlertsCtrl]);

function AlertsCtrl($scope,$http) {

    //$http.post('/auth/login',{username:'gseven',password:'123456'}).success(function(data){
    //    console.log(data);
    //});

    $scope.alerts = [{
        type: 'success',
        msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
    }, {
        type: 'danger',
        msg: 'Found a bug? Create an issue with as many details as you can.'
    }];

    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}