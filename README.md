# PaySlip
 Generate Monthly Payslips from employee annual salary.
 The web application calculates employees monthly payslips based on their annual salaries.

# CSV Template
 data-template.csv

# CSV Format  
# header :: type(length)
 1. firstName ::           string(20) 
 2. lastName  ::           string(20)  
 3. annualSalary ::        number(min = 0)  
 4. super ::               number(range 0%-100%)
 5. paymentPeriod ::       string(30)
 
# Install Instructions
 1. npm install -g bower grunt-cli karma-cli
 2. npm start
 Server started at http://localhost:8080

# Testing
 npm test

 
#Assumptions Made When Developing the Solution
 1. All payment periods are for a period of exactly one month.
 2. Format of payment period in CSV or Browser input is valid. No validation will be performed against payment period. Input value will be used directly in out put
 3. Upload employee salary details in csv format with a delimiter of ' , ' 