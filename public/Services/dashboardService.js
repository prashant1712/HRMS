
hrms_app.service('dashboardSvc',function($http){
    let self=this;

    self.getReports= function(){
        
        return $http.get('http://localhost:3000/dashboard')
                .then(function(response){
                    console.log(response.data);
            return response.data;
        });
    }
})