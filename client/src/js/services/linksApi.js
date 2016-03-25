/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('linksApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }

    this.getLinksList = (page)=> httpRequest({method: 'GET', url: `/links/list?page=${page}`});
    this.getLinksDetails=(newsId)=>httpRequest({method:'GET',url:`/links/details?link_id=${newsId}`});
    this.addLinks = (news)=>httpRequest({method: 'POST', url: `/links/add`, data: news});
    this.editLinks = (news)=>httpRequest({method: 'POST', url: `/links/edit`, data: news});
    this.deleteLinks= (newsId)=>httpRequest({method: 'POST', url: `/links/delete`, data: {link_id:newsId}});
}]);