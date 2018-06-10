(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'app.employee',
        'app.employee.new',
        'app.employee.details',
        'app.directives.about',
        'app.directives.format',
        'purplefox.numeric',
        'angularFileUpload'
    ]);
})();
