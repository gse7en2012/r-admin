/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('strategyApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }

    //if use core es6 promise, must be $scope.$digest()
    //function httpRequest2(opts){
    //    return new Promise((resolve,reject)=>{
    //        $http(opts).success((data)=>{
    //            return resolve(data)
    //        }).error((e)=>{
    //            return reject(e);
    //        })
    //    })
    //}

    this.getStrategyList = (page)=> httpRequest({method: 'GET', url: `/strategy/list?page=${page}`});
    this.getStrategyDetails=(strategyId)=>httpRequest({method:'GET',url:`/strategy/details?strategy_id=${strategyId}`});
    this.searchStrategy = (keyword)=>httpRequest({method: 'GET', url: `/strategy/search?keyword=${keyword}`});
    this.addStrategy = (strategy)=>httpRequest({method: 'POST', url: `/strategy/add`, data: strategy});
    this.editStrategy = (strategy)=>httpRequest({method: 'POST', url: `/strategy/edit`, data: strategy});
    this.deleteStrategy= (strategyId)=>httpRequest({method: 'POST', url: `/strategy/delete`, data: {strategy_id:strategyId}});
}]);