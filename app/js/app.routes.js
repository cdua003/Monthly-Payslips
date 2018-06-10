(function () {
    'use strict';

    angular.module('app')

            .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/employees/payslip');
        $urlRouterProvider.when('/', '/employees/payslip');
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('root', {
                abstract: true,
                url: '/',
                data: {
                    title: 'Home'
                },
                views: {
                    'header': {
                        templateUrl: 'views/headerView.html'
                    },
                    'footer': {
                        templateUrl: 'views/footerView.html'
                    }
                }
            })
            .state('root.employees', {
                abstract: true,
                url: 'employees',
                data: {
                    title: 'Employees'
                }
            })
            .state('root.employees.payslip', {
                url: '/payslip',
                data: {
                    title: 'Employees payslip'
                },
                views: {
                    'content@': {
                        templateUrl: 'views/employeeList.html',
                    }
                }
            })
            .state('root.employees.new', {
                url: '/new',
                data: {
                    title: 'New Employee'
                },
                views: {
                    'content@': {
                        templateUrl: 'views/newEmployee.html',
                        controller: 'NewEmployeeController',
                        controllerAs: 'ENC'
                    }
                }
            })
            .state('root.employees.details', {
                url: '/details',
                data: {
                    title: 'Employee details',
                },
                views: {
                    'content@': {
                        templateUrl: 'views/employDetails.html',
                        controller: 'EmployeeDetailsController',
                        controllerAs: 'EDC'
                    }
                },
                params: {
                    id: null
                }
            })
    }
})();
