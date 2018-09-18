(function(){
    
    hrms_app.controller('createEmployeeCtrl',['$rootScope','$scope','designationSvc','Cities','employeeSvc','shiftService','attendanceSvc',function($rootScope,$scope,designationSvc,Cities,employeeSvc,shiftService,attendanceSvc){
        $scope.sameCurr= true;
        $scope.assignDesignation= false;
        $scope.inEmployee= false;
        $scope.shiftassigned= false;
        $scope.user={};
        let designationDetail=[];
        $scope.status = {
            isopen: false
          };
        $scope.oneAtATime= false;
        $scope.permselected_city= undefined;
        $scope.currselected_city= undefined;
        
       
        $scope.cities= this.cities;
        designationDetail= this.designationDetail;
        $scope.shifts= this.shifts;
        $scope.selectedShift= "Shifts Available";

        $scope.toggleShift= function(shift){
            $scope.selectedShift= shift.name
        }
        
        $scope.address= function(){
            $scope.sameCurr= true;
            if($scope.sameCurr==true){
                $scope.user.currAddress=$scope.user.permAddress;
                $scope.user.currselected_city= $scope.user.permselected_city;
            }
        }
        
        

        $rootScope.$on("dndFlag",function(e,data){
            $scope.showDnd= data;
            console.log($scope.showDnd)
        })
        $rootScope.$on("assignedComponentsChanged",function(e,data){
            $scope.assignedComponents= data;
            console.log($scope.assignedComponents)
        })
        $rootScope.$on("designationSelected",function(e,data){
            $scope.designationSelected= data;
            console.log($scope.designationSelected)
        })

        $scope.assign= function(shiftData){
            $scope.shift= shiftData;
            console.log($scope.shift)
            $scope.shiftassigned= true;
        }

        $scope.submit= function(employee){
            let new_employee={};
            new_employee.permanent={};
            new_employee.current={};
            new_employee.firstname= employee.firstname.$viewValue;
            new_employee.lastname= employee.lastname.$viewValue;
            new_employee.contact_no= employee.phone.$viewValue;
            new_employee.username= employee.username.$viewValue;
            new_employee.permanent.address= employee.permAddress.$viewValue;
            new_employee.permanent.city= employee.permAddcity.$viewValue;
            new_employee.shifts= $scope.shift;
            new_employee.password= employee.password.$viewValue;
            if($scope.sameCurr==true){
                new_employee.current.address= employee.permAddress.$viewValue;
                new_employee.current.city= employee.permAddcity.$viewValue;
            }
            else{
                new_employee.current.address= employee.currAddress.$viewValue;
                new_employee.current.city= employee.currAddcity.$viewValue;
            }
            new_employee.email= employee.email.$viewValue;
            
            
            if($scope.showDnd==true){
                new_employee.totalSalary= $scope.assignedComponents.totalSalary;
                new_employee.designationName= $scope.assignedComponents.name;
                new_employee.salary_components= $scope.assignedComponents.salary_components;
                new_employee.basic_salary= $scope.assignedComponents.basic_salary;
            }
            else{
                
                for(let i=0;i<designationDetail.length;i++){
                    if($scope.designationSelected==designationDetail[i].name){
                        console.log("in normal create")
                        new_employee.totalSalary= designationDetail[i].totalSalary;
                        new_employee.designationName= designationDetail[i].name;
                        new_employee.salary_components= designationDetail[i].salary_components;
                        new_employee.basic_salary= designationDetail[i].basic_salary;
                    }
                }
            }
            console.log(new_employee)
                
            
            employeeSvc.createEmployee(new_employee)
            .then(function(data){
                alert("Saved Successfully!");
                 location.reload();
            })
        }



    }]);
    hrms_app.directive("compareTo", ['$parse', function($parse){
        return {
            require: "ngModel",
            scope: {
              otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {
      
              ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
              };
      
              scope.$watch("otherModelValue", function() {
                ngModel.$validate();
              });
            }
          };
    }]);
})();
