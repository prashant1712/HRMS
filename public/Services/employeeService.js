(function(){
    let hrms_app=angular.module('hrms');
    hrms_app.service('employeeSvc',function($http){
        let self=this;
        self.createEmployee= function(new_employee){
            console.log(new_employee)
            return $http.post('http://localhost:3000/employees/create', new_employee)
            .then(function(response){
                console.log(response);
            });
        };

        self.getEmployee= function(){
            
           return $http.get('http://localhost:3000/employees/view')
                    .then(function(response){
                        console.log(response.data);
                return response.data;
            });
        }

        self.deleteEmployee = function(index){
            return $http.delete('http://localhost:3000/employees/'+index)
            .then(function(response){
                console.log(response);
            })
        }


        self.getEmployeebyId= function(id){
            return $http.get('http://localhost:3000/employees/id')
            .then(function(response){
                //console.log(response.data);
        return response.data;
    });
        }

        self.saveData= function(designationId,editedComponent){
            $http.put('http://localhost:3000/employees/'+designationId+'/salary_components?name='+editedComponent.name, editedComponent)
            .then(function(response){
                console.log(response);
            });
        };
    })
})();