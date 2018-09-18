(function(){
    hrms_app.component('createDesignation',{
        templateUrl: 'Components/Designation/createDesignation/createDesig.html',
        controller: 'createDesigCtrl',
        bindings:{
            availableSalaries: '<'
        }
    });

    hrms_app.component('viewDesignation',{
        bindings:{
            inemployee: '@'
        },
        templateUrl: 'Components/Designation/viewDesignation/viewDesignation.html',
        controller : 'viewDesignationCtrl'
        
    });

})();