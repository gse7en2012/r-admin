/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('NewsEditCtrl', ['$scope', '$cookieStore','$stateParams', 'newsApiService', NewsEditCtrl]);

function NewsEditCtrl($scope, $cookieStore,$stateParams, newsApiService) {
    console.log($stateParams);
    const newsId=$stateParams.news_id;

    newsApiService.getNewsDetails(newsId).then((data)=>{
        $scope.content=data.result.content;
        $scope.title=data.result.title;
        $scope.author=data.result.author;
        $scope.date=moment(data.result.date).format('YYYY-MM-DD');
    });

    $scope.ct = {
        //这个很重要一定为空(图片的前缀)
        imagePath : "",
        //server 上传接口
        imageUrl : "/upload"
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
            location.href='/#/news'
        })
    }
}