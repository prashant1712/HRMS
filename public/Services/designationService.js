(function(){
    let hrms_app=angular.module('hrms');
    hrms_app.service('designationSvc',function($http){
        let self=this;
        self.createDesignation= function(new_designation){
            return $http.post('http://localhost:3000/designation', new_designation)
            .then(function(response){
                console.log(response);
            });
        };

        self.getDesignation= function(){
            
           return $http.get('http://localhost:3000/designation')
                    .then(function(response){
                        //console.log(response.data);
                return response.data;
            });
        }


        self.saveData= function(id,savedComponents){
            $http.patch('http://localhost:3000/designation/'+id, savedComponents)
            .then(function(response){
                console.log(response);
            });
        };
    })
})();