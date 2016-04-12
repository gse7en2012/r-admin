/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('LinksEditCtrl', ['$scope', '$cookieStore','$stateParams', 'linksApiService', LinksEditCtrl]);

function LinksEditCtrl($scope, $cookieStore,$stateParams, linksApiService) {
    const linkId=$stateParams.link_id;

    linksApiService.getLinksDetails(linkId).then((data)=>{
        $scope.img=data.result.link_img;
        $scope.name=data.result.link_name;
        $scope.author=data.result.author;
        $scope.link=data.result.link_address;
        $scope.sort=data.result.sort;
    });

    $scope.uploadSuccess=function(msg){
        $scope.uploaddone=true;
        $scope.img=JSON.parse(msg).url;
    };


    $scope.edit=()=>{
        linksApiService.editLinks({
            img:$scope.img,
            author:$scope.author,
            name:$scope.name,
            link:$scope.link,
            sort:$scope.sort,
            link_id:linkId
        }).then(()=>{
            alert('修改成功!');
            location.href='/#/links'
        })
    }
}