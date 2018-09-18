hrms_app.controller('attendanceCtrl',['$rootScope','$scope','employeeSvc','designationSvc',function($rootScope,$scope,employeeSvc,designationSvc){
    
    $scope.employeeDetails=[];
    $scope.employees=[];
    $scope.designations=[];
    $scope.showEmployees= false;
    $scope.selected_designation= undefined;
    $scope.employeeDetails= this.employeeDetails;
    $scope.employees= this.employeeDetails;
    $scope.designations= this.designations
    $scope.showAdminView= $rootScope.showAdminView
    console.log($scope.showEmployees)


    $scope.submit= function(designationName){
        $scope.employeeDetails=[];
        if(designationName.designation.$viewValue!=''){
            for(let i=0;i<$scope.employees.length;i++){
                if($scope.employees[i].designationName==designationName.designation.$viewValue){
                    $scope.employeeDetails.push($scope.employees[i]);
                }
            }
        }
        else{
            $scope.employeeDetails= $scope.employees;
        }
        
    }
    

    $scope.markAttendance = function(index){
        console.log("index is - " + index);
    }

}])
    