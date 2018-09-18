(function(){
    let hrms_app=angular.module('hrms');
    
    hrms_app.service('SalaryComponentSvc',function($http){
        let self=this;
        self.createSalaryComponent= function(new_component){
            return $http.post('http://localhost:3000/salary_components/', new_component)
            .then(function(response){
                console.log(response);
            });
        };

        self.getSalaryComponents= function(){
            
           return $http.get('http://localhost:3000/salary_components')
                    .then(function(response){
                return response.data;
            });
        }

        self.getComponentbyId= function(id){
            return $http({
                url: 'http://localhost:3000/salary_components/'+id,
                method: 'GET'
            })
        };

        self.removeComponent= function(id){
            return $http.delete('http://localhost:3000/salary_components/'+id)
                .then(function(response){
                    console.log(response);
                })
            
        }

        self.saveData= function(component){
            $http.patch('http://localhost:3000/salary_components/'+component._id, component)
            .then(function(response){
                console.log(response);
            });
        }
    })
})();