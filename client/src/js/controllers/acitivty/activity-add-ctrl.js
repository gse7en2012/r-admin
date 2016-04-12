/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('ActivityAddCtrl', ['$scope', '$cookieStore', 'activityApiService', ActivityAddCtrl]);

function ActivityAddCtrl($scope, $cookieStore, activityApiService) {

    $scope.author=$cookieStore.get('radmin_name');

    $scope.uploadSuccess=function(msg){
        $scope.uploaddone=true;
        $scope.img=JSON.parse(msg).url;
    };

    $scope.add=()=>{
        console.log($scope.img);
        if(!$scope.img) return alert('请上传图片!');
        if(!$scope.link) return alert('请填写链接!');
        activityApiService.addActivity({
            title:$scope.title,
            author:$scope.author,
            link:$scope.link,
            img:$scope.img,
            sort:$scope.sort
        }).then(()=>{
            alert('发布成功!');
            location.href='/#/activity'
        })
    }
}