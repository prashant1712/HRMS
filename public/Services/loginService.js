(function(){
    let hrms_app=angular.module('hrms');
    hrms_app.service('loginSvc',function($http,$cookies,$state){
        let self=this;

        self.getLogin= function(new_user){
            console.log(new_user)
            return $http.post('http://localhost:3000/login', new_user)
            .then(function(response){
                if(response.data.success== true){
                    $cookies.put('token',response.data.token)
                    
                }
                else{
                    console.log("Login Unsuccessful")
                }

            })
            .catch(function(err){
                throw err
            })
        };

    })
})();