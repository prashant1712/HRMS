(function(){
    hrms_app.directive('designationName',['$q','$timeout','designationSvc', function($q, $timeout, designationSvc) {
        return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            let designation_name=[];
            designationSvc.getDesignation()
            .then(function(data){
                for(let i=0;i<data.length;i++){
                    designation_name.push(data[i].name.toLowerCase());
                }
            })
            ctrl.$asyncValidators.name_designation = function(modelValue, viewValue) {
    
            if (ctrl.$isEmpty(modelValue)) {
                return $q.resolve();
            }
    
            var def = $q.defer();
    
            $timeout(function() {
                //console.log(modelValue.toLowerCase());
                if (designation_name.indexOf(modelValue.toLowerCase()) === -1) {
                def.resolve();
                
                } else {
                def.reject();
                }
    
            }, 1000);
    
            return def.promise;
            };
        }
        };
    }]);

})();