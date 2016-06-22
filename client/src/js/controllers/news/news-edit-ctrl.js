/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('NewsEditCtrl', ['$scope', '$cookieStore', '$stateParams', 'newsApiService', NewsEditCtrl]);

function NewsEditCtrl($scope, $cookieStore, $stateParams, newsApiService) {
    const newsId = $stateParams.news_id;

    newsApiService.getNewsDetails(newsId).then((data)=> {
        $scope.content     = data.result.content;
        $scope.title       = data.result.title;
        $scope.custom_link = data.result.custom_link;
        $scope.cover       = data.result.cover;
        $scope.author      = data.result.author;
        $scope.date        = moment(data.result.date).format('YYYY-MM-DD');
    });

    $scope.ct = {
        //这个很重要一定为空(图片的前缀)
        imagePath: "",
        //server 上传接口
        imageUrl: "/upload"
    };

    $scope.edit = ()=> {
        newsApiService.editNews({
            title: $scope.title,
            author: $scope.author,
            uid: 1,
            date: new Date(),
            cover: $scope.cover,
            //custom_link:$scope.custom_link,
            content: $scope.content,
            news_id: newsId
        }).then(()=> {
            alert('修改成功!');
            location.href = '/#/news'
        })
    };

    $scope.uploadSuccess = function (msg) {
        $scope.uploaddone = true;
        $scope.cover      = JSON.parse(msg).url;
    };
}