/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('UsersAddCtrl', ['$scope', '$cookieStore', 'usersApiService', UsersAddCtrl]);

function UsersAddCtrl($scope, $cookieStore, usersApiService) {

    $scope.permissions=false;

    $scope.add=()=>{

        usersApiService.addUsers({
            username:$scope.username,
            password:$scope.password,
            permissions:$scope.permissions
        }).then(()=>{
            alert('新增成功!');
            location.href='/#/user'
        })
    }
}