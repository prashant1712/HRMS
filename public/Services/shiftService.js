(function(){
    let hrms_app=angular.module('hrms');
    hrms_app.service('shiftService',function($http){
        let self=this;
        self.createShifts= function(new_shift){
            // console.log(new_shift)
            return $http.post('http://localhost:3000/shifts', new_shift)
            .then(function(response){
                console.log(response);
            });
        };

        self.getShifts= function(){
            
           return $http.get('http://localhost:3000/shifts')
                    .then(function(response){
                        console.log(response.data);
                return response.data;
            });
        }

        self.editShifts= function(editedShift){
            $http.put('http://localhost:3000/shifts/'+editedShift._id, editedShift)
            .then(function(response){
                console.log(response);
            });
        };

        self.deleteShift = function(index){
            return $http.delete('http://localhost:3000/shifts/'+index)
            .then(function(response){
                console.log(response);
            })
        }
    })
})();