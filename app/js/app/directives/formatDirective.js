(function () {
    'use strict';

    angular.module('app.directives.format', ['app'])

            .directive('format', format);

    format.$inject = ['$filter'];

    function format($filter) {
        var directive = {
            restrict: 'A',
            require: '?ngModel',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });

            element.bind('blur', function(event) {
                var plainNumber = element.val();//.replace(/[^\d|\-+|\.+]/g, '');
                plainNumber = plainNumber === undefined || plainNumber === null || plainNumber === ''? 0 : plainNumber.replace(/[^\d|\-+|\.+]/g, '');
                element.val($filter(attrs.format)(plainNumber));
            });
        }
    }
})();
