(function(){
    let hrms_app=angular.module('hrms');
    hrms_app.service('attendanceSvc',function($http){
        let self=this;
        self.createAttendance= function(new_attendance){
            console.log(new_attendance)
            return $http.post('http://localhost:3000/attendance', new_attendance)
            .then(function(response){
                console.log(response);
            });
        };

        self.getAttendance= function(){
            
           return $http.get('http://localhost:3000/attendance')
                    .then(function(response){
                        //console.log(response.data);
                return response.data;
            });
        }


        self.addAttendance= function(attendance_id,attendance){
            $http.patch('http://localhost:3000/attendance/'+attendance_id, attendance)
            .then(function(response){
                console.log(response);
            });
        };
    })
})();