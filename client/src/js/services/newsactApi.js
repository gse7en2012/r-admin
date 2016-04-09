/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('newsactApiService', ['$http', '$q', function ($http, $q) {

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

    this.getNewsList = (page)=> httpRequest({method: 'GET', url: `/news_act/list?page=${page}`});
    this.getNewsDetails=(newsactId)=>httpRequest({method:'GET',url:`/news_act/details?news_id=${newsactId}`});
    this.searchNews = (keyword)=>httpRequest({method: 'GET', url: `/news_act/search?keyword=${keyword}`});
    this.addNews = (newsact)=>httpRequest({method: 'POST', url: `/news_act/add`, data: newsact});
    this.editNews = (newsact)=>httpRequest({method: 'POST', url: `/news_act/edit`, data: newsact});
    this.deleteNews= (newsactId)=>httpRequest({method: 'POST', url: `/news_act/delete`, data: {news_act_id:newsactId}});
}]);