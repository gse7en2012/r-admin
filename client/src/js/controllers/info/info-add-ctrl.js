/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('InfoArtAddCtrl', ['$scope', '$cookieStore', 'infoApiService', InfoArtAddCtrl]);

function InfoArtAddCtrl($scope, $cookieStore, infoApiService) {
    $scope.content = '';
    $scope.date    = moment().format('YYYY-MM-DD');
    $scope.author  = $cookieStore.get('radmin_name');
    $scope.ct      = {
        //这个很重要一定为空(图片的前缀)
        imagePath: "",
        //server 上传接口
        imageUrl: "/upload"
//               toolbar: ['undo redo | bold italic underline']
    };

    infoApiService.getChannelList(1).then((data)=> {
        $scope.channelList = data.result.dataList;
    });

    $scope.uploadSuccess = function (msg) {
        $scope.uploaddone=true;
        $scope.img = JSON.parse(msg).url;
    };


    $scope.add = ()=> {
        if(!$scope.channelId) return alert('请选择栏目');
        infoApiService.addInfoArt({
            title: $scope.title,
            author: $scope.author,
            img:$scope.img,
            channel_id: $scope.channelId,
            content: $scope.content
        }).then(()=> {
            alert('发布成功!');
            location.href = '/#/info/list'
        })
    }
}