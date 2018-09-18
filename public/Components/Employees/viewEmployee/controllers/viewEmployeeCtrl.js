
hrms_app.controller('viewEmployeeCtrl',['$rootScope','$scope','employeeSvc','designationSvc','$ngBootbox',function($rootScope,$scope,employeeSvc,designationSvc,$ngBootbox){

    $scope.designations=[];
    $scope.selected_designation= undefined;
    $scope.designations= this.designations;
    $scope.employees=this.employeeDetails
    $scope.employeeDetails= this.employeeDetails
    console.log($scope.employeeDetails+" hi")
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
            $scope.employeeDetails= $scope.employees
        }
    }

    $scope.removeEmployee= function(employee){
        $ngBootbox.confirm('Delete all records of ' + employee.firstname + '?')
        .then(function(){
            employeeSvc.deleteEmployee(employee._id)
            .then(function(data){
                console.log(data);
                $scope.employeeDetails= $scope.employeeDetails.splice(employee._id,1);
                location.reload();
            })
        },
        function() {
            //Confirm was cancelled, don't delete customer
            console.log('Confirm was cancelled');
        });
        
    }


}])
