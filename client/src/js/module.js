/*umeditor*/
angular.module('lock-umeditor', []).directive("lockUmeditor", function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        scope: {
            //ueditor配置信息
            'config': "=",
            onBlur: "&lockUmeditorBlur",
            onFocus: "&lockUmeditorFocus"
        },
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                console.log("请设置 ngModel");
                return;
            }

            //自动创建id
            element[0].id = attrs.id ? attrs.id : "editor_" + (Date.now());

            //创建editor
            var um = UM.getEditor(element[0].id, scope.config || {});
            console.log(UM);
            ngModel.$render = function () {
                um.ready(function () {
                    um.setContent(ngModel.$viewValue || '');
                });
            };

            //销毁
            scope.$on("$destroy", function () {
                UM.delEditor(element[0].id);
            });


            if (scope.onBlur)
                um.addListener('blur', scope.onBlur);

            if (scope.onFocus)
                um.addListener('focus', scope.onFocus);


            um.addListener('selectionchange', function () {
                return scope.$apply(function () {
                    return ngModel.$setViewValue(um.getContent());
                });
            });

        }

    }

});


angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies', 'lock-umeditor', 'flow']);

