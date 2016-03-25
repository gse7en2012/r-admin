/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('LinksCtrl', ['$scope', '$cookieStore', 'linksApiService', LinksCtrl]);

function LinksCtrl($scope, $cookieStore, linksApiService) {

    function bindData2Scope(data){
        $scope.dataList    = data.result.dataList;
        $scope.currentPage = data.result.curPage;
        $scope.totalCount  = data.result.totalCount;
    }


    linksApiService.getLinksList(1).then(bindData2Scope);


    $scope.delete=(linkId)=>{
        if(!confirm('确定删除该友情链接?')) return false;
        linksApiService.deleteLinks(linkId).then(()=>{
            alert('删除成功');
            location.reload();
        })
    }
}