/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('InfoCtrl', ['$scope', '$cookieStore', 'infoApiService', InfoCtrl]);

function InfoCtrl($scope, $cookieStore, infoApiService) {

    function bindData2Scope(data){
        $scope.dataList    = data.result.dataList;
        $scope.dataList.forEach((item)=>{
            item.edit=false;
            item.newName=item.name;
        })
    }
    function editChannelT(data){
        infoApiService.editChannel({
            channel_id:data.channel_id,
            name:data.newName
        }).then(()=>{
            data.name=data.newName;
            data.edit=!data.edit;
        })
    }
    $scope.editChannelT=editChannelT;
    $scope.addShow=false;
    infoApiService.getChannelList(1).then(bindData2Scope);

    $scope.addChannel=function(name){
        infoApiService.addChannel(name).then((data)=>{
            $scope.dataList.push(data.result);
            $scope.addShow=!$scope.addShow;
        })
    };

    $scope.delete=(newsId)=>{
        if(!confirm('确定删除该栏目?\r\n\b该栏目下的文章也会被删除!')) return;
        infoApiService.deleteChannel(newsId).then(()=>{
            $scope.dataList.forEach((item,index)=>{
                if(item.channel_id==newsId){
                    $scope.dataList.splice(index,1)
                }
            })
        })
    }
}