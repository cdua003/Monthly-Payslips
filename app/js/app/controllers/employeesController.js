(function () {
    'use strict';

    angular.module('app.employee', ['app.employeesService', 'app.calculatorService', 'app.employeeUploadService'])

            .controller('EmployeesController', EmployeesController);

        EmployeesController.$inject = ['$scope', '$state', '$timeout', '$log', 'FileUploader', 'employeesService', 'calculatorService', 'employeeUploadService'];

        function EmployeesController($scope, $state, $timeout, $log, FileUploader, employeesService, calculatorService, employeeUploadService) {
            var fileReader = new FileReader();
            var vm = this;
            vm.errorMsg = {
                show: false,
                message: ''
            };
            vm.employees = [];
            vm.editDetail = editDetail;
            vm.uploader = $scope.uploader = new FileUploader()
            vm.uploader.filters.push({
                name: 'customFilter',
                fn: function (item, options) {
                    fileReader.readAsText(item);
                }
            });

            fileReader.onloadend = function (e) {
                var result = employeeUploadService.importEmployees(e.target.result);
                angular.element("input[type='file']").val(null);
                showErrorMsg(result.message);
                addEmployees(result.data);
            };

            retrieve();

            function showErrorMsg(message){
                if(!message || message === ''){
                    resetMessage();
                    return;
                }
                vm.errorMsg.show = true;
                vm.errorMsg.message = message;
                $scope.$apply();  
                $timeout(function () {
                    resetMessage();
                    $scope.$apply();
                }, 2000);
            }

            function resetMessage(){
                vm.errorMsg.show = false;
                vm.errorMsg.message = ''; 
            }

            function editDetail(id){
                $state.go('root.employees.details',  {id: id});
            }

            function retrieve() {
                return getEmployees().then(function () {
                    $log.info('Retrieved Employees');
                });
            }

            function getEmployees() {
                return employeesService.getEmployees()
                        .then(function (data) {
                            for(var i = 0, max = data.length; i < max; i++){
                                var slip = calculatorService.getPaySlip(data[i]);
                                if(slip === undefined || slip === null){
                                    continue;
                                }
                                vm.employees.push({
                                    detail: data[i],
                                    payslip: slip,
                                })
                            }
                            return vm.employees;
                        });
            }

            function addEmployees(data) {
                for(var i = 0, max = data.length; i < max; i++){
                    var slip = calculatorService.getPaySlip(data[i]);
                    if(slip === undefined || slip === null){
                        continue;
                    }
                    vm.employees.push({
                        detail: data[i],
                        payslip: slip,
                    })
                }
                $scope.$apply();
            }
        }
})();
