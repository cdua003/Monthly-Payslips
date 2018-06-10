describe("Unit: data validation Services", function() {
    describe("data validation Service:", function() {

        var $injector = angular.injector([ 'app.dataValidationService' ]);
        var service = $injector.get( 'dataValidationService' );
        

        it('should return true with correct format', function(){
            expect( service.addExcelDataToJSONListBySchema({
                "firstName": "max",
                "lastName": "smith",
                "annualSalary": "0",
                "super": "0",
                "paymentPeriod": "01 March - 31 March",
            },[]) ).toEqual(true);
            expect( service.addExcelDataToJSONListBySchema({
                "firstName": "max",
                "lastName": "smith",
                "annualSalary": "10",
                "super": "20",
                "paymentPeriod": "01 March - 31 March",
            },[]) ).toEqual(true);
        })

        it('should return false with long string', function(){
            expect( service.addExcelDataToJSONListBySchema({
                "firstName": "maxwwwwwwwwwwwwwwwwwwww",
                "lastName": "smith",
                "annualSalary": "10000",
                "super": "0",
                "paymentPeriod": "01 March - 31 March",
            },[]) ).toEqual(false);
            expect( service.addExcelDataToJSONListBySchema({
                "firstName": "max",
                "lastName": "smithwwwwwwwwwwwwwwwww",
                "annualSalary": "10000",
                "super": "0",
                "paymentPeriod": "01 March - 31 March",
            },[]) ).toEqual(false);
            expect( service.addExcelDataToJSONListBySchema({
                "firstName": "max",
                "lastName": "smith",
                "annualSalary": "10000",
                "super": "0",
                "paymentPeriod": "01 March - 31 Marchwwwwwwwwwwwwwwwwwwwww",
            },[]) ).toEqual(false);
        })

        it('should return true with correct salary range', function(){
            expect( service.addExcelDataToJSONListBySchema({
                "firstName": "max",
                "lastName": "smith",
                "annualSalary": "10000",
                "super": "0",
                "paymentPeriod": "01 March - 31 March",
            },[]) ).toEqual(true);
        })

        it('should return false with salary out of range', function(){
            expect( service.addExcelDataToJSONListBySchema({
                "firstName": "max",
                "lastName": "smith",
                "annualSalary": "-1",
                "super": "0",
                "paymentPeriod": "01 March - 31 March",
            },[]) ).toEqual(false);
        })

        it('should return true with correct super range', function(){
            expect( service.addExcelDataToJSONListBySchema({
                "firstName": "max",
                "lastName": "smith",
                "annualSalary": "10000",
                "super": "20",
                "paymentPeriod": "01 March - 31 March",
            },[]) ).toEqual(true);
        })

        it('should return true with correct super range', function(){
            expect( service.addExcelDataToJSONListBySchema({
                "firstName": "max",
                "lastName": "smith",
                "annualSalary": "0",
                "super": "100.10",
                "paymentPeriod": "01 March - 31 March",
            },[]) ).toEqual(false);
            expect( service.addExcelDataToJSONListBySchema({
                "firstName": "max",
                "lastName": "smith",
                "annualSalary": "0",
                "super": "-0.1",
                "paymentPeriod": "01 March - 31 March",
            },[]) ).toEqual(false);
        })
    });
});