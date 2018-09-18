hrms_app.component('reports', {
    controller: 'reportCtrl',
    templateUrl: 'Components/Reports/report.html',
    bindings:{
        employeeDetails: '<',
        designations: '<'
    }
   
})