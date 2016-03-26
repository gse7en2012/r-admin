/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('InfoArtListCtrl', ['$scope', '$cookieStore', 'infoApiService', InfoArtListCtrl]);

function InfoArtListCtrl($scope, $cookieStore, infoApiService) {

    function bindData2Scope(data){
        $scope.dataList    = data.result.dataList;
        $scope.currentPage = data.result.curPage;
        $scope.totalCount  = data.result.totalCount;
    }


    infoApiService.getChannelArtList(1).then(bindData2Scope);


    $scope.delete=(newsId)=>{
        if(!confirm('确定删除该文章?')) return false;
        newsApiService.deleteNews(newsId).then(()=>{
            alert('删除成功');
            location.reload();
        })
    }
}