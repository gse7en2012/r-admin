/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('VideoAddCtrl', ['$scope', '$cookieStore', 'activityApiService','FileUploader', VideoAddCtrl]);

function VideoAddCtrl($scope, $cookieStore, activityApiService,FileUploader) {

    $scope.author=$cookieStore.get('radmin_name');
    $scope.uploadAfter=false;

    $scope.uploader = new FileUploader({
        url:'/upload/video',
        alias:'video'
    });

    $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
       // console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.uploadAfter=!$scope.uploadAfter;
        $scope.videoUrl=response.url;
    };

    $scope.clickBtn=function(){
        $('#uv')[0].click()//('click');
    };

    $scope.add=()=>{
        console.log($scope.videoUrl);
        if(!$scope.videoUrl) return alert('请上传视频!');
        activityApiService.addVideo({
            title:$scope.title,
            author:$scope.author,
            link:$scope.videoUrl,
            sort:$scope.sort
        }).then(()=>{
            alert('发布成功!');
            location.href='/#/video'
        })
    }
}