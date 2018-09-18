hrms_app.controller("attendanceDetailModalCtrl", ['$scope', '$uibModal', '$log','employeeSvc', function ($scope, $uibModal, $log,employeeSvc) {

    $scope.showAttendance = function (employee) {
        console.log("Show Form Button Clicked");
        
        var modalInstance = $uibModal.open({
            templateUrl: 'Components/Employees/viewEmployee/Modal/attendanceDetail/attendanceDetail.html',
            controller: AttendanceDetailInstanceCtrl,
            scope: $scope,
            resolve: {
                employee: function () {
                  return employee;
                },
                attendanceData: function(attendanceSvc){
                    return attendanceSvc.getAttendance()
                    .then(function(data){
                       return data;
                    })
                }
            }
        });
       
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
}]);

let AttendanceDetailInstanceCtrl = function ($scope, $uibModalInstance,$timeout,SalaryComponentSvc,attendanceSvc,employee,attendanceData) {

    $scope.attendanceData=[];
    $scope.settings=[]
    
    $scope.attendanceData= attendanceData;
    $scope.lateTime=[];
    $scope.overtime=[];

    for(let i=0;i<$scope.attendanceData.length;i++){

        console.log($scope.attendanceData[i].employee_id+"inside 1st if")
        if($scope.attendanceData[i].employee_id==employee._id){
            $scope.eachDayAttendance= $scope.attendanceData[i].eachDayAttendance

        }
    }
        


$scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
};
};