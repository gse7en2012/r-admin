/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('NewsCtrl', ['$scope', '$cookieStore', 'newsApiService', NewsCtrl]);

function NewsCtrl($scope, $cookieStore, newsApiService) {

    function bindData2Scope(data){
        $scope.dataList    = data.result.dataList;
        $scope.currentPage = data.result.curPage;
        $scope.totalCount  = data.result.totalCount;
    }


    newsApiService.getNewsList(1).then(bindData2Scope);

    $scope.jump = (page)=> {
        newsApiService.getNewsList(page).then(bindData2Scope);
    };
    $scope.jumpNext=()=>{
        const p=++$scope.currentPage;
        console.log(p);
        newsApiService.getNewsList(p).then(bindData2Scope);
    };
    $scope.jumpPrev=()=>{
        const p=--$scope.currentPage;
        if(p<1) return alert('已是第一页!');
        newsApiService.getNewsList(p).then(bindData2Scope);
    };

    $scope.search=(keyword)=>{
        newsApiService.searchNews(keyword).then(bindData2Scope);
    };

    $scope.delete=(newsId)=>{
        if(!confirm('确定删除该文章?')) return false;
        newsApiService.deleteNews(newsId).then(()=>{
            alert('删除成功');
            location.reload();
        })
    }
}