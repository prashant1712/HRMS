let hrms_app=angular.module('hrms',['ui.router','ui.bootstrap','growlNotifications','ngBootbox','dndLists','ngAnimate','ngCookies'])

hrms_app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider

    
    .state('dashboard',{
        url: '/dashboard',
        component: 'dashboard',
        resolve:{
            dashboardReports: function(dashboardSvc){
                return dashboardSvc.getReports()
                    .then(function(data){
                        return data;
                    });
            },
            showAdminView: function($cookies){
                    let token= $cookies.get('token')
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    parsedData= JSON.parse(window.atob(base64));
                    console.log(parsedData)
                    if(parsedData.roles=='employee')
                        return false
                    else
                        return true
            }
        }
    })

    // .state('otherwise',{
    //     url: '*path',
    //     template: '<div ng-if="!$cookies.get("token")"><div class="alert alert-warning"><strong>Please <a ui-sref="login()">login to contiue</a>!</strong></div></div><div ng-if="$cokkies.get("token")"><strong>Enter Correct url</strong>'
    // })
    
    .state('login',{
        url: '/login',
        component: 'login'
    })



    .state('dashboard.salary_components',{
        url: '/salaryComponents',
        component: 'salary'
    })

    .state('dashboard.create_designations',{
        url: '/designations/create',
        component: 'createDesignation',
        resolve:{
            availableSalaries: function(SalaryComponentSvc){
                return SalaryComponentSvc.getSalaryComponents()
                    .then(function (data) {
                        return data;
                    });
            }
        }
    })
    
    .state('dashboard.view_designations',{
        url: '/designations/view',
        component: 'viewDesignation'
    })

    .state('dashboard.create_employees',{
        url:'/employee/create',
        component: 'createEmployee',
        resolve: {
            cities: function(Cities){
                return Cities.get_citynames()
                    .then(function(data){
                        return data;
                });
            },
            designationDetail: function(designationSvc){
                return designationSvc.getDesignation()
                    .then(function(data){
                        return data;   
                    });
            },
            shifts: function(shiftService){
                return shiftService.getShifts()
                    .then(function(data){
                        return data;
                    })
            }

        }
    })

    .state('dashboard.view_employees',{
        url:'/employee/view',
        component: 'viewEmployee',
        resolve: {
            // showAdminView: function($cookies){
            //     let token= $cookies.get('token')
            //     var base64Url = token.split('.')[1];
            //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            //     parsedData= JSON.parse(window.atob(base64));
            //     console.log(parsedData)
            //     if(parsedData.roles=='employee')
            //         return false
            //     else
            //         return true
            // },
            employeeDetails: function(employeeSvc){
                return employeeSvc.getEmployee()
                        .then(function(data){
                            console.log(data)
                            return data;
                        })
            },
            designations: function(designationSvc,$rootScope){
                let designationNames=[];
                if($rootScope.showAdminView=='true'){
                    return designationSvc.getDesignation()
                        .then(function(data){
                            
                            for(let i=0;i<data.length;i++){
                                designationNames.push(data[i].name);
                            }
                            return designationNames;        
                    });
                }
            }
        }
    })

    .state('dashboard.shifts',{
        url:'/shifts',
        component: 'shift'
    })

    .state('dashboard.attendance',{
        url:'/attendance',
        component: 'attendance',
        resolve: {
            employeeDetails: function(employeeSvc){
                return employeeSvc.getEmployee()
                        .then(function(data){
                            return data;
                        })
            },
            
            // showAdminView: function($cookies){
            //     let token= $cookies.get('token')
            //     var base64Url = token.split('.')[1];
            //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            //     parsedData= JSON.parse(window.atob(base64));
            //     console.log(parsedData)
            //     if(parsedData.roles=='employee')
            //         return false
            //     else
            //         return true
            // },
            designations: function(designationSvc,$rootScope){
                let designationNames=[];
                
                if($rootScope.showAdminView=='true'){
                    console.log($rootScope.showAdminView)
                    return designationSvc.getDesignation()
                        .then(function(data){
                            
                            for(let i=0;i<data.length;i++){
                                designationNames.push(data[i].name);
                            }
                            return designationNames;        
                    });
                }
            }
        }
    })

    .state('dashboard.employee_reports',{
        url:'/reports',
        component: 'reports',
        resolve:{
            employeeDetails: function(employeeSvc){
                return employeeSvc.getEmployee()
                        .then(function(data){
                            return data;
                        })
            },
            designations: function(designationSvc){
                let designationNames=[];
                return designationSvc.getDesignation()
                    .then(function(data){
                        for(let i=0;i<data.length;i++){
                            designationNames.push(data[i].name);
                        }
                        return designationNames;
                    });
            }
        }
        
    })

    .state('dashboard.settings',{
        url:'/settings',
        component: 'settings'
    })

    
}])

hrms_app.run(['$rootScope', '$state', '$transitions', '$cookies','$http', function ($rootScope, $state, $transitions, $cookies,$http) {
    $transitions.onStart({}, function (trans) { 
        console.log('$transitions.onStart', trans);
            const toState = trans.to();
            if (toState.name!='login' && !$cookies.get('token')) {
                console.log('redirecting to login');
                $state.go('login');
            }
            else{
                let tokenStr= $cookies.get('token')
                console.log(toState.name)
                if(tokenStr){
                    $http.defaults.headers.common={'Authorization': tokenStr}
                    $state.go(toState.name);
                }
            }
        });
}]);


