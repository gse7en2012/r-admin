/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('StrategyCtrl', ['$scope', '$cookieStore', 'strategyApiService', StrategyCtrl]);

function StrategyCtrl($scope, $cookieStore, strategyApiService) {

    function bindData2Scope(data){
        $scope.dataList    = data.result.dataList;
        $scope.currentPage = data.result.curPage;
        $scope.totalCount  = data.result.totalCount;
    }


    strategyApiService.getStrategyList(1).then(bindData2Scope);

    $scope.jump = (page)=> {
        strategyApiService.getStrategyList(page).then(bindData2Scope);
    };
    $scope.jumpNext=()=>{
        const p=++$scope.currentPage;
        strategyApiService.getStrategyList(p).then(bindData2Scope);
    };
    $scope.jumpPrev=()=>{
        const p=--$scope.currentPage;
        if(p<1) return alert('已是第一页!');
        strategyApiService.getStrategyList(p).then(bindData2Scope);
    };

    $scope.search=(keyword)=>{
        console.log(keyword,$scope.keyword);
        strategyApiService.searchStrategy(keyword).then(bindData2Scope);
    };

    $scope.delete=(strategyId)=>{
        if(!confirm('确定删除该文章?')) return false;
        strategyApiService.deleteStrategy(strategyId).then(()=>{
            alert('删除成功');
            location.reload();
        })
    }
}