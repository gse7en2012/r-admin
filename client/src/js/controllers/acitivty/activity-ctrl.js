/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('ActivityCtrl', ['$scope', '$cookieStore', 'activityApiService', ActivityCtrl]);

function ActivityCtrl($scope, $cookieStore, activityApiService) {

    function bindData2Scope(data){
        $scope.dataList    = data.result.dataList;
        $scope.currentPage = data.result.curPage;
        $scope.totalCount  = data.result.totalCount;
    }


    activityApiService.getActivityList(1).then(bindData2Scope);



    $scope.delete=(actId)=>{
        if(!confirm('确定关闭该活动?')) return false;
        activityApiService.deleteActivity(actId).then(()=>{
            alert('关闭成功');
            location.reload();
        })
    }

    $scope.open=(actId)=>{
        if(!confirm('确定开启该活动?')) return false;
        activityApiService.openActivity(actId).then(()=>{
            alert('开启成功');
            location.reload();
        })
    }
}