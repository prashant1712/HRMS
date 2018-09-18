
    hrms_app.directive('salaryComponentName',['$q','$timeout','SalaryComponentSvc', function($q, $timeout, SalaryComponentSvc) {
        return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            let salaryComponent=[];
            SalaryComponentSvc.getSalaryComponents()
            .then(function(data){
                for(let i=0;i<data.length;i++){
                    salaryComponent.push(data[i].name.toLowerCase());
                }
            })
            ctrl.$asyncValidators.componentName = function(modelValue, viewValue) {
    
            if (ctrl.$isEmpty(modelValue)) {
                return $q.resolve();
            }
    
            var def = $q.defer();
    
            $timeout(function() {
                //console.log(modelValue.toLowerCase());
                if (salaryComponent.indexOf(modelValue.toLowerCase()) === -1) {
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





    