/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('activityApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }

    this.getActivityList = (page)=> httpRequest({method: 'GET', url: `/activity/list?page=${page}`});
    this.getActivityDetails=(newsId)=>httpRequest({method:'GET',url:`/activity/details?activity_id=${newsId}`});
    this.addActivity = (news)=>httpRequest({method: 'POST', url: `/activity/add`, data: news});
    this.editActivity = (news)=>httpRequest({method: 'POST', url: `/activity/edit`, data: news});
    this.deleteActivity= (newsId)=>httpRequest({method: 'POST', url: `/activity/delete`, data: {activity_id:newsId}});
    this.openActivity= (newsId)=>httpRequest({method: 'POST', url: `/activity/open`, data: {activity_id:newsId}});
}]);