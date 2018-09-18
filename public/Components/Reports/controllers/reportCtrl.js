
hrms_app.controller('reportCtrl',['$scope','employeeSvc','designationSvc','settingsSvc',function($scope,employeeSvc,designationSvc,settingsSvc,employeeDetails){
    $scope.employeeDetails=[];
    $scope.employees=[];
    $scope.designations=[];
    $scope.selected_designation= undefined;
    $scope.employeeDetails= this.employeeDetails;
    $scope.employees= this.employeeDetails;
    console.log(this.designations)
    $scope.designations= this.designations;

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

}])
