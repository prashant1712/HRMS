(function(){
    hrms_app.component('createEmployee',{
        templateUrl: 'Components/Employees/createEmployee/createEmployee.html',
        controller: 'createEmployeeCtrl',
        bindings:{
            cities: '<',
            designationDetail: '<',
            shifts: '<'
        }
    });

    hrms_app.component('viewEmployee',{
        
        templateUrl: 'Components/Employees/viewEmployee/viewEmployee.html',
        controller : 'viewEmployeeCtrl',
        bindings:{
            employeeDetails: '<',
            designations: '<'
        }
    });

})();