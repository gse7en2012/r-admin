/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('infoApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }


    this.getChannelList = (page)=> httpRequest({method: 'GET', url: `/info/list`});
    this.getChannelArtList=(page,type)=>httpRequest({method:'GET',url:`/info/art/list?page=${page}&type=${type}`});
    this.addChannel = (name)=>httpRequest({method: 'POST', url: `/info/add`, data: {name:name}});
    this.addInfoArt=(art)=>httpRequest({method:'POST',url:`info/art/add`,data:art});
    this.editChannel = (news)=>httpRequest({method: 'POST', url: `/info/edit`, data: news});
    this.getArtDetails=(artId)=>httpRequest({method:'GET',url:`/info/art/details?art_id=${artId}`});
    this.editArt=(art)=>httpRequest({method:'POST',url:`/info/art/edit`,data:art});
    this.deleteChannel= (newsId)=>httpRequest({method: 'POST', url: `/info/delete`, data: {channel_id:newsId}});
    this.deleteInfoArt=(artId)=>httpRequest({method: 'POST', url: `/info/art/delete`, data: {art_id:artId}});
}]);