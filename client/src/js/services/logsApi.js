/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('logsApiService', ['$http', '$q', function ($http, $q) {

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

    this.getLoginLogsList = (page)=> httpRequest({method: 'GET', url: `/logs/login_list?page=${page}`});
    this.getOpLogsList = (page)=> httpRequest({method: 'GET', url: `/logs/logs_list?page=${page}`});
}]);