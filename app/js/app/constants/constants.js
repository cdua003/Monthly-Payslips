(function () {
    'use strict';

    angular.module('app')

            .constant('APP_AUTHOR', 'Chen Duan')
            .constant('APP_NAME', 'Employee monthly pay slip')
            .constant('APP_VERSION', '1.0.0')
            .constant('FILEUPLOADLIMIT', 500)
            .constant('PROPERTIES', ["firstName", "lastName", "annualSalary", "super", "paymentPeriod"]);
})();
