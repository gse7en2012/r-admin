/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('LinksEditCtrl', ['$scope', '$cookieStore','$stateParams', 'linksApiService', LinksEditCtrl]);

function LinksEditCtrl($scope, $cookieStore,$stateParams, linksApiService) {
    const linkId=$stateParams.link_id;

    linksApiService.getLinksDetails(linkId).then((data)=>{
        $scope.content=data.result.content;
        $scope.title=data.result.title;
        $scope.author=data.result.author;
        $scope.date=moment(data.result.date).format('YYYY-MM-DD');
    });

    $scope.uploadSuccess=function(msg){
        $scope.img=JSON.parse(msg).url;
    };


    $scope.edit=()=>{
        newsApiService.editNews({
            title:$scope.title,
            author:$scope.author,
            uid:1,
            date:new Date(),
            content:$scope.content
        }).then(()=>{
            alert('修改成功!');
            location.href='/#/links'
        })
    }
}