/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('InfoArtEditCtrl', ['$scope', '$cookieStore','$stateParams', 'infoApiService', InfoArtEditCtrl]);

function InfoArtEditCtrl($scope, $cookieStore,$stateParams, infoApiService) {
    console.log(333);
    $scope.ct = {
        //这个很重要一定为空(图片的前缀)
        imagePath: "",
        //server 上传接口
        imageUrl: "/upload"
//               toolbar: ['undo redo | bold italic underline']
    };

    const artId = $stateParams.art_id;
    let tmp;
    infoApiService.getArtDetails(artId).then((data)=> {
        $scope.title      = data.result.title;
        $scope.author     = data.result.author;
        $scope.img        = data.result.img;
        $scope.content    = data.result.content;
        tmp=data.result.channel_id;
        return infoApiService.getChannelList();
    }).then((data)=>{
        $scope.channelList=[];
        data.result.dataList.forEach((item)=>{
            $scope.channelList .push({
                value:item.channel_id,
                name:item.name
            })
        });
        $scope.channelId = $scope.channelList[tmp];
        console.log(tmp,$scope.channelId);
    });




    $scope.uploadSuccess = function (msg) {
        $scope.img = JSON.parse(msg).url;
    };


    $scope.edit = ()=> {
        if (!$scope.channelId) return alert('请选择栏目');
        infoApiService.editArt({
            title: $scope.title,
            author: $scope.author,
            img: $scope.img,
            channel_id: $scope.channelId.value,
            content: $scope.content,
            art_id:artId
        }).then(()=> {
            alert('修改成功!');
            location.href = '/#/info/list'
        })
    }
}