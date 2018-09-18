(function(){
    let hrms_app= angular.module('hrms');
    hrms_app.service('Cities',function($http){
        let self= this;
        
        self.get_citynames= function(){
            return $.getJSON('https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities-name-list.json')
                    .then(function(response){
                        console.log(response.data)
                        return response.data;
                    });
                }
                 
    });
    
})();