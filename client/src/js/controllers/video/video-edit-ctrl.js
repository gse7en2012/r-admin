/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('VideoEditCtrl', ['$scope', '$state','$stateParams','$timeout', 'activityApiService', VideoEditCtrl]);

function VideoEditCtrl($scope, $state,$stateParams, $timeout,activityApiService) {
    const videoId=$stateParams.video_id;

    activityApiService.getVideoDetails(videoId).then((data)=>{
        $scope.videoUrl=data.result.link;
        $scope.title=data.result.title;
        $scope.author=data.result.author;
        $scope.sort=data.result.sort;
        $scope.video={
            link:data.result.link
        }

        $timeout(function(){
            videojs(document.getElementsByClassName('video-js')[0])
        },200)


    });


    $scope.edit=()=>{
        activityApiService.editVideo({
            title:$scope.title,
            author:$scope.author,
            sort:$scope.sort,
            video_id:videoId
        }).then(()=>{
            alert('修改成功!');
            location.href='/#/video';
        })
    }
}