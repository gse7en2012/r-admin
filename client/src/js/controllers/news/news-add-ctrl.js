/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('NewsAddCtrl', ['$scope', '$cookieStore', 'newsApiService', NewsAddCtrl]);

function NewsAddCtrl($scope, $cookieStore, newsApiService) {
    $scope.content = '';
    $scope.date=moment().format('YYYY-MM-DD');
    $scope.author=$cookieStore.get('radmin_name');
    $scope.ct = {
        //这个很重要一定为空(图片的前缀)
        imagePath : "/",
        //server 上传接口
        imageUrl : "/upload"
//               toolbar: ['undo redo | bold italic underline']
    };


    $scope.add=()=>{
        newsApiService.addNews({
            title:$scope.title,
            author:$scope.author,
            uid:1,
            date:new Date(),
            custom_link:$scope.custom_link,
            content:$scope.content
        }).then(()=>{
            alert('发布成功!');
            location.href='/#/news'
        })
    }
}