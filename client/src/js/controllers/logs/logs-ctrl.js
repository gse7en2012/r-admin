/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('LogsCtrl', ['$scope', 'logsApiService', LogsCtrl]);

function LogsCtrl($scope, logsApiService) {

    function bindData2Scope(data) {
        $scope.dataList    = data.result.dataList;
        $scope.currentPage = data.result.curPage;
        $scope.totalCount  = data.result.totalCount;
    }

    logsApiService.getLoginLogsList(1).then(bindData2Scope);

    $scope.jump = (page)=> {
        logsApiService.getOpLogsList(page).then(bindData2Scope);
    };
    $scope.jumpNext=()=>{
        const p=++$scope.currentPage;
        console.log(p);
        logsApiService.getLoginLogsList(p).then(bindData2Scope);
    };
    $scope.jumpPrev=()=>{
        const p=--$scope.currentPage;
        if(p<1) return alert('已是第一页!');
        logsApiService.getLoginLogsList(p).then(bindData2Scope);
    };


}