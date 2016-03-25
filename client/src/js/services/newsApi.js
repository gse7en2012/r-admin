/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('newsApiService', ['$http', '$q', function ($http, $q) {

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

    this.getNewsList = (page)=> httpRequest({method: 'GET', url: `/news/list?page=${page}`});
    this.getNewsDetails=(newsId)=>httpRequest({method:'GET',url:`/news/details?news_id=${newsId}`});
    this.searchNews = (keyword)=>httpRequest({method: 'GET', url: `/news/search?keyword=${keyword}`});
    this.addNews = (news)=>httpRequest({method: 'POST', url: `/news/add`, data: news});
    this.editNews = (news)=>httpRequest({method: 'POST', url: `/news/edit`, data: news});
    this.deleteNews= (newsId)=>httpRequest({method: 'POST', url: `/news/delete`, data: {news_id:newsId}});
}]);