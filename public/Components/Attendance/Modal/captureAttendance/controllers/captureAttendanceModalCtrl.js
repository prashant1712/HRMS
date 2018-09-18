
hrms_app.controller('captureAttendanceModalCtrl', ['$scope', '$uibModal', '$log','employeeSvc','attendanceSvc', function ($scope, $uibModal, $log,employeeSvc,attendanceSvc) {
    
    
    console.log("in controller of capture")

    $scope.markAttendance = function (id) {
        console.log("Show Form Button Clicked");
        
        console.log(id);
        var modalInstance = $uibModal.open({
            templateUrl: 'Components/Attendance/Modal/captureAttendance/captureAttendanceModal.html',
            controller: AttendanceInstanceCtrl,
            resolve: {
                id: function () {
                  return id;
                }
            },
            scope: $scope,
        });
       
        modalInstance.result.then(function (selectedItem) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
}]);


let AttendanceInstanceCtrl = function ($scope, $uibModalInstance,SalaryComponentSvc,attendanceSvc,id) {

    $scope.id= id;
    $scope.attendanceData=[];
    attendanceSvc.getAttendance()
    .then(function(data){
        $scope.attendanceData= data;
    })

    $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();
    
      $scope.clear = function() {
        $scope.dt = null;
      };
    
      $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };
    
      $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: new Date(),
        startingDay: 1
      };
    
      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }
    
      
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    
    
      $scope.selectDate = function() {
        $scope.popup2.opened = true;
      };
    
      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };
    
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];
    
      $scope.popup2 = {
        opened: false
      };
    
      
    
      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);
    
          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
    
            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }
    
        return '';
      }
    $scope.submit = function (captureattendance) {

        let checkin = (captureattendance.checkin.$viewValue).getHours() * 60 + (captureattendance.checkin.$viewValue).getMinutes();
        let checkout = (captureattendance.checkout.$viewValue).getHours() * 60 + (captureattendance.checkout.$viewValue).getMinutes();
        let employeeAttendance={};
        let new_employee= true;
        employeeAttendance.eachDayAttendance=[];
        console.log("checkin is" + captureattendance.checkin.$viewValue);
        console.log("checkout is" + captureattendance.checkout.$viewValue);
        if (checkin < checkout) {
            console.log("Inside if");
            employeeAttendance.employee_id= $scope.id;
            employeeAttendance.eachDayAttendance.push(
                {
                "Date": captureattendance.attendanceDate.$viewValue,
                "checkintime": captureattendance.checkin.$viewValue,
                "checkouttime": captureattendance.checkout.$viewValue
                }
            );
            
            console.log(employeeAttendance);

            for(let i=0;i<$scope.attendanceData.length;i++){
                if($scope.attendanceData[i].employee_id== $scope.id){
                    new_employee= false;
                    for(let j=0;j<$scope.attendanceData[i].eachDayAttendance.length;j++){
                        employeeAttendance.eachDayAttendance.push($scope.attendanceData[i].eachDayAttendance[j]);
                    }
                    attendanceSvc.addAttendance($scope.attendanceData[i]._id,employeeAttendance);
                    break;
                    
                }
            }
            if(new_employee==true){
                
                attendanceSvc.createAttendance(employeeAttendance)
                .then(function(data){
                    console.log(data);
                }) ;
            }
            $uibModalInstance.close('closed');
                
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};