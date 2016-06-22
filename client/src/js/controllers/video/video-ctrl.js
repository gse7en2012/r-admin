/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('VideoCtrl', ['$scope', '$cookieStore','$timeout', 'activityApiService', VideoCtrl]);

function VideoCtrl($scope, $cookieStore, $timeout,activityApiService) {

    function bindData2Scope(data){
        $scope.dataList    = data.result.dataList;
        $scope.currentPage = data.result.curPage;
        $scope.totalCount  = data.result.totalCount;

        $timeout(function(){
            Array.prototype.slice.call(document.getElementsByClassName('video-js')).forEach(function(item){
                videojs(item)
            })
        },100)
    }


    activityApiService.getVideoList(1).then(bindData2Scope);



    $scope.delete=(actId)=>{
        if(!confirm('确定关闭该视频?')) return false;
        activityApiService.deleteVideo(actId).then(()=>{
            alert('关闭成功');
            location.reload();
        })
    };

    $scope.open=(actId)=>{
        if(!confirm('确定开启该视频?')) return false;
        activityApiService.openVideo(actId).then(()=>{
            alert('开启成功');
            location.reload();
        })
    }
}