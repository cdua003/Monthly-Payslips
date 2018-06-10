(function () {
    'use strict';

    angular.module('app.employee.details', ['ui.router', 'app.calculatorService'])

            .controller('EmployeeDetailsController', EmployeeDetailsController);

    EmployeeDetailsController.$inject = ['$scope', '$stateParams', '$state', 'calculatorService'];

    function EmployeeDetailsController($scope, $stateParams, $state, calculatorService) {
        if($stateParams.id === undefined || $stateParams.id === null || $stateParams.id < 0){
            $state.go('root.employees.payslip');
            return;
        }
        var vm = this;
        vm.updateEmployee = updateEmployee;
        vm.formData = $scope.EC.employees[$stateParams.id];

        function updateEmployee() {
            vm.formData.detail.annualSalary = vm.formData.detail.annualSalary === undefined || vm.formData.detail.annualSalary === null || vm.formData.detail.annualSalary === ''? 0 : vm.formData.detail.annualSalary;
            vm.formData.detail.super = vm.formData.detail.super === undefined || vm.formData.detail.super === null || vm.formData.detail.super === ''? 0 : vm.formData.detail.super;
            var slip = calculatorService.getPaySlip(vm.formData.detail);
            if(slip !== undefined && slip !== null){
                vm.formData.payslip = slip;
            }
            $state.go('root.employees.payslip');
        }
    }
})();
