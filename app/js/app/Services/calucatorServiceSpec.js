describe("Unit: calucator Services", function() {
    describe("calucator Service:", function() {

        var $injector = angular.injector([ 'app.calculatorService' ]);
        var service = $injector.get( 'calculatorService' );

        it('should not exit if null', function(){
            expect( service.getPaySlip(null) ).toEqual(null);
        })

        it('should not exist with empty object', function(){
            expect( service.getPaySlip({}) ).toEqual(null);
        })

        it('should not exist with incorrect employee header - firstName', function(){
            var result = service.getPaySlip({
                first: 'chen',
                lastName: 'duan',
                annualSalary: 100000,
                super: 9,
                paymentPeriod: '01 March - 31 March'
            });
            expect(result).toEqual(null);
        })

        it('should not exist with incorrect employee header - lastName', function(){
            var result = service.getPaySlip({
                firstName: 'chen',
                last: 'duan',
                annualSalary: 100000,
                super: 9,
                paymentPeriod: '01 March - 31 March'
            });
            expect(result).toEqual(null);
        })

        it('should not exist with incorrect employee header - annualSalary', function(){
            var result = service.getPaySlip({
                firstName: 'chen',
                lastName: 'duan',
                annual: 100000,
                super: 9,
                paymentPeriod: '01 March - 31 March'
            });
            expect(result).toEqual(null);
        })

        it('should not exist with incorrect employee header - super', function(){
            var result = service.getPaySlip({
                firstName: 'chen',
                lastName: 'duan',
                annualSalary: 100000,
                Super: 9,
                paymentPeriod: '01 March - 31 March'
            });
            expect(result).toEqual(null);
        })

        it('should not exist with incorrect employee header - paymentPeriod', function(){
            var result = service.getPaySlip({
                firstName: 'chen',
                lastName: 'duan',
                annualSalary: 100000,
                super: 9,
                paymentDate: '01 March - 31 March'
            });
            expect(result).toEqual(null);
        })

        it('should return object with 0 grossIncome when salary is in string format', function(){
            var result = service.getPaySlip({
                firstName: 'chen',
                lastName: 'duan',
                annualSalary: 'aaaa',
                super: 9,
                paymentPeriod: '01 March - 31 March'
            });
            expect(result.grossIncome).toEqual(0);
        })

        it('should return object with 0 superAnnuation when super is in string format', function(){
            var result = service.getPaySlip({
                firstName: 'chen',
                lastName: 'duan',
                annualSalary: 120000,
                super: 'aaaa',
                paymentPeriod: '01 March - 31 March'
            });
            expect(result.superAnnuation).toEqual(0);
        })

        it('should have property name chen duan when correct format', function(){           
            var result = service.getPaySlip({
                firstName: 'chen',
                lastName: 'duan',
                annualSalary: 100000,
                super: 8,
                paymentPeriod: '01 March - 31 March'
            });
            expect(result.name).toEqual('chen duan');
        })

        it('should be an object with property name chen duan when both annualsalary and super are 0', function(){           
            var result = service.getPaySlip({
                firstName: 'chen',
                lastName: 'duan',
                annualSalary: 0,
                super: 0,
                paymentPeriod: '01 March - 31 March'
            });
            expect(result.name).toEqual('chen duan');
        })
    });
});