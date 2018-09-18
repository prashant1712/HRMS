hrms_app.controller('reportlModalCtrl', ['$scope', '$uibModal', '$log','employeeSvc','attendanceSvc','settingsSvc', function ($scope, $uibModal, $log,employeeSvc,attendanceSvc,settingsSvc) {

    $scope.viewReport = function (employee) {
        console.log("Show Form Button Clicked");
        
        var modalInstance = $uibModal.open({
            templateUrl: 'Components/Reports/Modal/Report/reportModal.html',
            controller: ReportInstanceCtrl,
            scope: $scope,
            resolve: {
                employee: function () {
                  return employee;
                },
                attendanceData: function(){
                    return attendanceSvc.getAttendance()
                        .then(function(data){
                            return data;
                        })
                },
                settingsData: function(){
                    return settingsSvc.getSettings()
                        .then(function(data){
                            return data;
                        })
                }
            },
        });
       
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
}]);

let ReportInstanceCtrl = function ($scope, $uibModalInstance,$timeout,SalaryComponentSvc,attendanceSvc,settingsSvc,employee,attendanceData,settingsData) {

    $scope.attendanceData=[];
    $scope.settings=[]
    $scope.attendanceData= attendanceData;
    $scope.settings= settingsData;
    $scope.lateDeductions=0;
    $scope.overtimeAllowances=0;
    $scope.editedtotalSalary= employee.totalSalary;

    

    
    for(let i=0;i<$scope.attendanceData.length;i++){
        if($scope.attendanceData[i].employee_id==employee._id){
            
            for(let j=0;j<$scope.attendanceData[i].eachDayAttendance.length;j++){
                
                let checkinDate= new Date($scope.attendanceData[i].eachDayAttendance[j].checkintime);
                let checkoutDate=new Date($scope.attendanceData[i].eachDayAttendance[j].checkouttime);
                
                let shiftStart= new Date(employee.shifts.starttime);
                let shiftEnd= new Date(employee.shifts.endtime);
                console.log(checkinDate.getHours()+" "+shiftStart.getHours())
                if(checkinDate.getHours()> shiftStart.getHours()){
                    for(let k=0;k<$scope.settings.length;k++){
                        console.log($scope.settings[k])
                        if($scope.settings[k].type=="late"){
                            if((checkinDate.getHours()- shiftStart.getHours())*60==$scope.settings[k].duration){
                                $scope.lateDeductions=parseInt($scope.lateDeductions+($scope.settings[k].percentValue*employee.basic_salary*(checkinDate.getHours()-shiftStart.getHours()))/3000);
                                $scope.editedtotalSalary= parseInt($scope.editedtotalSalary- $scope.lateDeductions);
                                console.log($scope.lateDeductions)
                                console.log($scope.editedtotalSalary+"deduct");
                                break;
                            }
                            else{
                                $scope.lateDeductions= parseInt($scope.lateDeductions+(100*employee.basic_salary)/3000);
                                $scope.editedtotalSalary= parseInt($scope.editedtotalSalary- $scope.lateDeductions);
                                console.log($scope.editedtotalSalary);
                                break;
                            }
                            
                            break;
                        }
                        
                    }    
                }

                if(checkoutDate.getHours()> shiftEnd.getHours()){
                    for(let k=0;k<$scope.settings.length;k++){
                        if($scope.settings[k].type=="overtime"){
                            $scope.overtimeAllowances= parseInt($scope.overtimeAllowances+($scope.settings[k].percentValue*employee.basic_salary*(checkoutDate.getHours()-shiftEnd.getHours()))/3000);
                            $scope.editedtotalSalary=parseInt($scope.editedtotalSalary+ $scope.overtimeAllowances);
                            console.log($scope.overtimeAllowances)
                            console.log($scope.editedtotalSalary)
                            break;
                        }
                    }
                }
                if(checkoutDate.getHours()< shiftEnd.getHours()){
                    for(let k=0;k<$scope.settings.length;k++){
                        if($scope.settings[k].type=="late"){
                            if((checkinDate.getHours()- shiftStart.getHours())*60==$scope.settings[k].duration){
                                $scope.lateDeductions= parseInt($scope.lateDeductions+($scope.settings[k].percentValue*employee.basic_salary*(checkinDate.getHours()- shiftStart.getHours()))/3000);
                                $scope.editedtotalSalary= parseInt($scope.editedtotalSalary- $scope.lateDeductions);
                                console.log($scope.editedtotalSalary+"deduct");
                                break;
                            }
                            else{
                                $scope.lateDeductions= parseInt($scope.lateDeductions+(100*employee.basic_salary)/3000);
                                $scope.editedtotalSalary= parseInt($scope.editedtotalSalary- $scope.lateDeductions);
                                console.log($scope.editedtotalSalary);
                                break;
                            }
                            
                            break;
                        }
                    }
                }
            }
        }
    }
    console.log($scope.editedtotalSalary)


$scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
};
};