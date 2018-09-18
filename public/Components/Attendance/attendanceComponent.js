hrms_app.component('attendance', {
    controller: 'attendanceCtrl',
    templateUrl: 'Components/Attendance/attendance.html',
    bindings: {
        employeeDetails: '<',
        designations: '<'
    }
   
})