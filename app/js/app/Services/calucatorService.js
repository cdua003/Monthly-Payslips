(function () {
    'use strict';

    angular.module('app.calculatorService', [])

            .service('calculatorService', calculatorService);

    calculatorService.$inject = [];

    function calculatorService() {
        var taxSlab = [
            { min: 0, max: 18200, flatTax: 0, taxPerDollar: 0 },
            { min: 18201, max: 37000, flatTax: 0, taxPerDollar: 0.19 },
            { min: 37001, max: 87000, flatTax: 3572, taxPerDollar: 0.325 },
            { min: 87001, max: 180000, flatTax: 19822, taxPerDollar: 0.37 },
            { min: 180001, max: Number.POSITIVE_INFINITY, flatTax: 54232, taxPerDollar: 0.45 }
        ]
    
        function MonthlyPaySlip(name, period, grossIncome, incomeTax, netIncome, superAnnuation) {
            this.name = name;
            this.period = period;
            this.grossIncome = grossIncome;
            this.incomeTax = incomeTax;
            this.netIncome = netIncome;
            this.superAnnuation = superAnnuation;
        }
    
        function calcGrossIncome(annualSalary) {
            return Math.round(annualSalary / 12);
        }
    
        function calcIncomeTax(annualSalary) {
            for (var i = 0; i < taxSlab.length; i++) {
                var slab = taxSlab[i];
                if (annualSalary >= slab.min && annualSalary <= slab.max) {
                    return Math.round((slab.flatTax + ((annualSalary - (slab.min - 1)) * slab.taxPerDollar)) / 12);
                }
            }
        }
    
    
        this.getPaySlip = function(employee) {
            try {
                employee.annualSalary = Number(employee.annualSalary.toString().replace(/[^0-9\.-]+/g,""));          
                employee.super = Number(employee.super.toString().replace(/[^0-9\.-]+/g,"")); 
                var paySlip = new MonthlyPaySlip(
                    employee.firstName === undefined || employee.lastName === undefined 
                        ? undefined : employee.firstName + " " + employee.lastName,
                    employee.paymentPeriod,
                    calcGrossIncome(employee.annualSalary),
                    calcIncomeTax(employee.annualSalary),
                    calcGrossIncome(employee.annualSalary) - calcIncomeTax(employee.annualSalary),
                    Math.round(calcGrossIncome(employee.annualSalary) * employee.super / 100));
    
                if (paySlip.name === undefined || paySlip.period === undefined || isNaN(paySlip.grossIncome) 
                    || isNaN(paySlip.incomeTax) || isNaN(paySlip.netIncome) || isNaN(paySlip.superAnnuation)) {
                    
                    throw new Error('incorrect input');
                }
    
                return paySlip;
            } catch (e) {
                return null;
            }
        }
    }
})();