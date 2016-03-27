/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('StrategyEditCtrl', ['$scope', '$cookieStore','$stateParams', 'strategyApiService', StrategyEditCtrl]);

function StrategyEditCtrl($scope, $cookieStore,$stateParams, strategyApiService) {
    const strategyId=$stateParams.strategy_id;

    strategyApiService.getStrategyDetails(strategyId).then((data)=>{
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
        strategyApiService.editStrategy({
            title:$scope.title,
            author:$scope.author,
            uid:1,
            date:new Date(),
            content:$scope.content,
            strategy_id:strategyId
        }).then(()=>{
            alert('修改成功!');
            location.href='/#/strategy'
        })
    }
}