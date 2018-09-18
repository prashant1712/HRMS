(function(){
    let hrms_app=angular.module('hrms');
    hrms_app.service('settingsSvc',function($http){
        let self=this;

        self.addSettings= function(new_setting){
            return $http.post('http://localhost:3000/settings', new_setting)
            .then(function(response){
                console.log(response);
            });
        }

        self.getSettings= function(){
            
           return $http.get('http://localhost:3000/settings')
                    .then(function(response){
                        //console.log(response.data);
                return response.data;
            });
        }


        self.editSettings= function(id,settings){
            $http.put('http://localhost:3000/settings/'+id, settings)
            .then(function(response){
                console.log(response);
            });
        };

        self.deleteSettings= function(id){
            return $http.delete('http://localhost:3000/settings/'+id)
            .then(function(response){
                console.log(response);
            })

        }
    })
})();