'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/news');

        // Application routes
        $stateProvider
            .state('admin', {
                url: '/',
                templateUrl: 'templates/news/newsList.html'
            })
            .state('news', {
                url: '/news',
                templateUrl: 'templates/news/newsList.html'
            })
            //.state('news.list',{
            //    url:'/list',
            //    templateUrl:'templates/news.list.html'
            //})
            .state('newsAdd', {
                url: '/news/add',
                templateUrl: 'templates/news/newsAdd.html'
            })
            .state('newsEdit', {
                url: '/news/edit/:news_id',
                templateUrl: 'templates/news/newsEdit.html'
            })
            .state('activity', {
                url: '/activity',
                templateUrl: 'templates/activity/activityList.html'
            })
            .state('activityAdd', {
                url: '/activity/add',
                templateUrl: 'templates/activity/activityAdd.html'
            })
            .state('activityEdit', {
                url: '/activity/edit/:act_id',
                templateUrl: 'templates/activity/activityEdit.html'
            })
            .state('link', {
                url: '/links',
                templateUrl: 'templates/links/linkList.html'
            })
            .state('linkEdit', {
                url: '/links/edit/:link_id',
                templateUrl: 'templates/links/linkEdit.html'
            })
            .state('linkAdd', {
                url: '/links/add',
                templateUrl: 'templates/links/linkAdd.html'
            })
            .state('info', {
                url: '/info',
                templateUrl: 'templates/info/infoChannelList.html'
            })
            .state('infoArt', {
                url: '/info/list',
                templateUrl: 'templates/info/infoArtList.html'
            });
    }
]);