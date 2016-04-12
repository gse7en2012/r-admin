/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('ActivityEditCtrl', ['$scope', '$state','$stateParams', 'activityApiService', ActivityEditCtrl]);

function ActivityEditCtrl($scope, $state,$stateParams, activityApiService) {
    console.log($state.params);
    console.log($stateParams);
    const activityId=$stateParams.act_id;

    activityApiService.getActivityDetails(activityId).then((data)=>{
        $scope.link=data.result.link;
        $scope.title=data.result.title;
        $scope.author=data.result.author;
        $scope.img=data.result.img;
        $scope.sort=data.result.sort;
    });

    $scope.uploadSuccess=function(msg){
        $scope.uploaddone=true;
        $scope.img=JSON.parse(msg).url;
    };

    $scope.edit=()=>{
        activityApiService.editActivity({
            title:$scope.title,
            author:$scope.author,
            link:$scope.link,
            img:$scope.img,
            sort:$scope.sort,
            activity_id:activityId
        }).then(()=>{
            alert('修改成功!');
            location.href='/#/activity';
        })
    }
}