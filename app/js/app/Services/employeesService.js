(function () {
    'use strict';

    angular.module('app.employeesService', [])

            .factory('employeesService', employeesService);

    employeesService.$inject = ['$http', '$log', '$q'];

    function employeesService($http, $log, $q) {
        return {
            getEmployees: getEmployees
        };

        function getEmployees() {
            return $http.get('data/data.json')
                    .then(getEmployeesComplete)
                    .catch(getEmployeesFailed);

            function getEmployeesComplete(response) {
                return response.data;
            }

            function getEmployeesFailed(e) {
                var newMessage = 'XHR Failed for getEmployees.';
                $log.error(newMessage);
                return $q.reject(e);
            }
        }
    }
})();
