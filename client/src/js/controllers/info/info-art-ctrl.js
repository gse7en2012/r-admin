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


    infoApiService.getChannelArtList(1,0).then(bindData2Scope);
    infoApiService.getChannelList().then((data)=>{
        $scope.channelList=[{value:0,name:'所有'}];
        data.result.dataList.forEach((item)=>{
            $scope.channelList .push({
                value:item.channel_id,
                name:item.name
            })
        });
        $scope.channelId=$scope.channelList[0];
    });

    $scope.changeChannel=function(){
        console.log($scope.channelId);
        infoApiService.getChannelArtList(1,$scope.channelId.value).then(bindData2Scope);
    };
    $scope.jump=function(page){
        infoApiService.getChannelArtList(page,$scope.channelId.value).then(bindData2Scope);
    };


    $scope.delete=(newsId)=>{
        if(!confirm('确定删除该文章?')) return false;
        infoApiService.deleteInfoArt(newsId).then(()=>{
            //alert('删除成功');
            $scope.dataList.forEach((item,index)=>{
                if(item.art_id==newsId){
                    $scope.dataList.splice(index,1)
                }
            })
        })
    }
}