/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('LinksAddCtrl', ['$scope', '$cookieStore', 'linksApiService', LinksAddCtrl]);

function LinksAddCtrl($scope, $cookieStore, linksApiService) {
    //console.log($scope.name);
    $scope.author=$cookieStore.get('radmin_name');


    $scope.uploadSuccess=function(msg){
        $scope.uploaddone=true;
        $scope.img=JSON.parse(msg).url;
    };

    $scope.add=()=>{

        linksApiService.addLinks({
            img:$scope.img,
            author:$scope.author,
            name:$scope.name2,
            link:$scope.link,
            sort:$scope.sort
        }).then(()=>{
            alert('发布成功!');
            location.href='/#/links'
        })
    }
}