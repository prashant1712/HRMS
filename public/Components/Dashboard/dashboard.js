hrms_app.component('dashboard', {
    controller: 'dashboardCtrl',
    templateUrl: 'Components/Dashboard/dashboard.html',
    bindings:{
        dashboardReports: '<',
        showAdminView: '@'
    }
   
})