/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$http', '$state','usersApiService', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $http, $state,usersApiService) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
    $scope.navName = '新闻管理';
    $scope.$on('$stateChangeSuccess', function () {
        //console.log(location.href);
        const currentTab = location.href.split('/#/')[1].split('/')[0];
        console.log(currentTab);
        $('.sidebar-list a').removeClass('cur');
        $('.sidebar-list a').each(function () {
            if ($(this).attr('href') == '#/' + currentTab) {
                $(this).addClass('cur');
                $scope.navName = $(this).text();
            }
        })

    });
    $scope.getWidth = function () {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function (newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = !$cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function () {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    $scope.setNavName = function (obj) {
        $('.sidebar-list a').removeClass('cur');
        $(obj.target).addClass('cur');
        $scope.navName = $(obj.target).text() == '' ? $(obj.target).parent().text() : $(obj.target).text();
    };
    $scope.name       = $cookieStore.get('radmin_name');

    var uid=$cookieStore.get('radmin_id');
    $http.get('/auth/check/master?uid='+uid).success(function(data){
        if(data.result==1){
            $scope.isMasterAdmin=true;
        }
    });



    $scope.changePassword = function () {
        const newPass = prompt('请输入' + $scope.name + '的新密码');
        if (!newPass) return alert('请输入密码!');
        usersApiService.updatedUserPassword({
            uid: uid,
            password: newPass
        }).then(()=> {
            alert('操作成功');
        })
    }

    window.onresize = function () {
        $scope.$apply();
    };

}