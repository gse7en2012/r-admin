/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('NewsActEditCtrl', ['$scope', '$cookieStore','$stateParams', 'newsactApiService', NewsActEditCtrl]);

function NewsActEditCtrl($scope, $cookieStore,$stateParams, newsactApiService) {
    const newsId=$stateParams.news_id;

    newsactApiService.getNewsDetails(newsId).then((data)=>{
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
        newsactApiService.editNews({
            title:$scope.title,
            author:$scope.author,
            uid:1,
            date:new Date(),
            content:$scope.content,
            news_act_id:newsId
        }).then(()=>{
            alert('修改成功!');
            location.href='/#/news_act'
        })
    }
}