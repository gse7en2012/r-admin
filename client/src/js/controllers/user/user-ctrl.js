/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('UsersCtrl', ['$scope', '$cookieStore', 'usersApiService', UsersCtrl]);

function UsersCtrl($scope, $cookieStore, usersApiService) {

    function bindData2Scope(data) {
        $scope.dataList = data.result;
    }

    usersApiService.getUsersList().then(bindData2Scope);


    $scope.delete = (uid, type)=> {
        const tips=type==1?'允许':'禁止';
        if (!confirm('确定'+tips+'该用户登录?')) return false;
        usersApiService.banUser(uid, type == 1 ? 0 : 1).then(()=> {
            alert('操作成功');
            location.reload();
        })
    };

    $scope.change = function (uid, name) {
        const newPass = prompt('请输入' + name + '的新密码');
        if (!newPass) return alert('请输入密码!');
        usersApiService.updatedUserPassword({
            uid: uid,
            password: newPass
        }).then(()=> {
            alert('操作成功');
        })
    }
}