/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('usersApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }

    //if use core es6 promise, must be $scope.$digest()
    //function httpRequest2(opts){
    //    return new Promise((resolve,reject)=>{
    //        $http(opts).success((data)=>{s
    //            return resolve(data)
    //        }).error((e)=>{
    //            return reject(e);
    //        })
    //    })
    //}

    this.getUsersList = ()=> httpRequest({method: 'GET', url: `/auth/user/list`});
    this.addUsers = (user)=>httpRequest({method: 'POST', url: `/auth/user/add`, data: user});
    this.updatedUserPassword = (user)=>httpRequest({method: 'POST', url: `/auth/user/update`, data: user});
    this.banUser= (uid,type)=>httpRequest({method: 'POST', url: `/auth/user/ban`, data: {uid:uid,type:type}});
}]);