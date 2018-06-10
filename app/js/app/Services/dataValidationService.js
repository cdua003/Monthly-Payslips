(function () {
    'use strict';

    angular.module('app.dataValidationService', [])

            .service('dataValidationService', dataValidationService);

    dataValidationService.$inject = [];

    function dataValidationService() {
        var employeeSchema = [
            { name: 'firstName', type: 'string', length: '20' },
            { name: 'lastName', type: 'string', length: '20' },
            { name: 'annualSalary', type: 'number' },
            { name: 'super', type: 'percentage' },
            { name: 'paymentPeriod', type: 'string', length: '30' }
        ];

        var checkValueBySchema = function(value, type, length) {

            if (type == 'string' && value.length <= length) {
                return value;
            } else if (type == 'number' && Number(value) != NaN && Number(value) >= 0) {
                return Number(value);
            } else if (type == 'percentage' && Number(value) != NaN && Number(value) >= 0 && Number(value) <= 100) {
                return Number(value);
            }else {
                return null;
            }
        };
    
        var getSchema = function(column){
            var schema = _.filter(employeeSchema, function (item) {
                return item.name === column;
            })
            if(schema.length === 0){
                return null;
            }
            return schema[0];
        }

        this.addExcelDataToJSONListBySchema = function(data, resultList) {
            var obj = [];
            var isValidSchema = true;
            for (var property in data) {
                var schema = getSchema(property);
                if(schema === null){
                    continue;
                }
                var formatedValue = checkValueBySchema(data[property], schema.type, schema.length);
                if (formatedValue != null) {
                    obj[schema.name] = formatedValue;
                } else {
                    isValidSchema = false;
                }
            }
            if (isValidSchema) {
                resultList.push(obj);
            }
            return isValidSchema;
        }
    }
})();