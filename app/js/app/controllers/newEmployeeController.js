(function () {
    'use strict';

    angular.module('app.employee.new', ['ui.router', 'app.calculatorService'])

            .controller('NewEmployeeController', NewEmployeeController);

    NewEmployeeController.$inject = ['$scope', '$state', '$log', 'calculatorService'];

    function NewEmployeeController($scope, $state, $log, calculatorService) {
        var vm = this;

        vm.addEmployee = addEmployee;
        vm.formData = getEmployeeTemplate();

        function addEmployee() {
            vm.formData.annualSalary = vm.formData.annualSalary === undefined || vm.formData.annualSalary === null || vm.formData.annualSalary === ''? 0 : vm.formData.annualSalary;
            vm.formData.super = vm.formData.super === undefined || vm.formData.super === null || vm.formData.super === ''? 0 : vm.formData.super;
            var slip = calculatorService.getPaySlip(vm.formData);
            if(slip !== undefined && slip !== null){
                $scope.EC.employees.push({
                    detail: vm.formData,
                    payslip: slip,
                })
            }
            vm.formData = getEmployeeTemplate();
            $state.go('root.employees.payslip');
        }

        function getEmployeeTemplate(){
            return {
                'firstName': "",
                'lastName': "",
                'annualSalary': 0,
                'superRate': 0,
                'paymentPeriod': ""
            };
        }
    }
})();
