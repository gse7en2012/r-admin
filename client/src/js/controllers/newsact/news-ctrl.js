/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('NewsActCtrl', ['$scope', '$cookieStore', 'newsactApiService', NewsActCtrl]);

function NewsActCtrl($scope, $cookieStore, newsactApiService) {

    function bindData2Scope(data){
        $scope.dataList    = data.result.dataList;
        $scope.currentPage = data.result.curPage;
        $scope.totalCount  = data.result.totalCount;
    }


    newsactApiService.getNewsList(1).then(bindData2Scope);

    $scope.jump = (page)=> {
        newsactApiService.getNewsList(page).then(bindData2Scope);
    };
    $scope.jumpNext=()=>{
        const p=++$scope.currentPage;
        console.log(p);
        newsactApiService.getNewsList(p).then(bindData2Scope);
    };
    $scope.jumpPrev=()=>{
        const p=--$scope.currentPage;
        if(p<1) return alert('已是第一页!');
        newsactApiService.getNewsList(p).then(bindData2Scope);
    };

    $scope.search=(keyword)=>{
        newsactApiService.searchNews(keyword).then(bindData2Scope);
    };

    $scope.delete=(newsId)=>{
        if(!confirm('确定删除该文章?')) return false;
        newsactApiService.deleteNews(newsId).then(()=>{
            alert('删除成功');
            location.reload();
        })
    }
}