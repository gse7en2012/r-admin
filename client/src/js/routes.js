'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/news');

        // Application routes
        $stateProvider
            .state('admin', {
                url: '/',
                templateUrl: 'templates/news/newsList.html'
            })
            .state('news',{
                url:'/news',
                templateUrl: 'templates/news/newsList.html'
            })
            //.state('news.list',{
            //    url:'/list',
            //    templateUrl:'templates/news.list.html'
            //})
            .state('newsAdd',{
                url:'/news/add',
                templateUrl: 'templates/news/newsAdd.html'
            })
            .state('newsEdit',{
                url:'/news/edit/:news_id',
                templateUrl: 'templates/news/newsEdit.html'
            })
            .state('activity',{
                url:'/activity',
                templateUrl: 'templates/activity/activityList.html'
            })
            .state('activityAdd',{
                url:'/activity/add',
                templateUrl: 'templates/activity/activityAdd.html'
            })
            .state('activityEdit',{
                url:'/activity/edit/:act_id',
                templateUrl: 'templates/activity/activityEdit.html'
            })
            .state('link',{
                url:'/links',
                templateUrl: 'templates/links/linkList.html'
            })
            .state('linkAdd',{
                url:'/links/add',
                templateUrl: 'templates/links/linkAdd.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            });
    }
]);