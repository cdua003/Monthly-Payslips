(function () {
    'use strict';

    angular.module('app.employeeUploadService', ['app.dataValidationService'])

            .service('employeeUploadService', employeeUploadService);

    employeeUploadService.$inject = ['FILEUPLOADLIMIT', 'PROPERTIES', 'dataValidationService'];

    function employeeUploadService(FILEUPLOADLIMIT, PROPERTIES, dataValidationService) {
        var messages = {
            paySlipFileUpload_EMPTY : "Empty data in csv",
            paySlipFileUpload_FormatError : "Invalid format in csv",
            paySlipFileUpload_ErrorAtLine : "Invalid format in csv at line no: ",
            paySlipFileUpload_IncorrectHeader : "Incorrect Headers in csv",
            paySlipFileUpload_FileLimitError : "Max 500 csv rows allowed",
            unknownError : "Unknown Error"
        }

        this.importEmployees = function(file) {
            var basicValidate = basicValidation(file);
            if(basicValidate !== null){
                return {
                    data: [],
                    message: basicValidate
                };
            }

            var data = $.csv.toObjects(file, {});

            var limitationValidate = limitationValidation(data);
            if(limitationValidate !== null){
                return {
                    data: [],
                    message: basicValidate
                };
            }
            ;
            var formatValidate = formatValidation(data[0]);
            if(formatValidate !== null){
                return {
                    data: [],
                    message: formatValidate
                };
            }
            var result = {
                data: [],
                message: null
            }
            for(var i = 0, max = data.length; i < max; i++){
                var rowData = [];
                if(!dataValidationService.addExcelDataToJSONListBySchema(data[i],rowData)){
                    continue;
                }
                result.data.push(rowData[0]);
            }

            return result;
        }

        function basicValidation(file){
            if(!file){
                return messages.paySlipFileUpload_FormatError;
            }
            file = file.trim();
            if(file === ""){
                return messages.paySlipFileUpload_EMPTY;
            }
            return null;
        }

        function limitationValidation(data){
            if(data.length > FILEUPLOADLIMIT){
                return messages.paySlipFileUpload_FileLimitError;
            }
            if(data.length === 0){
                return messages.paySlipFileUpload_EMPTY;
            }
            return null;
        }

        function formatValidation(data){
            var dataProperties = Object.keys(data);
            for(var i = 0, max = PROPERTIES.length; i < max; i++){
                if((_.filter(dataProperties, function (item) {
                    return item === PROPERTIES[i];
                })).length === 0){
                    return messages.paySlipFileUpload_IncorrectHeader;
                }
            }
            return null;
        }
    }
})();