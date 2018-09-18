(function(){
    let hrms_app= angular.module('hrms');


    hrms_app.directive('username',['$q','$timeout','employeeSvc', function($q, $timeout, employeeSvc) {
        return {
          require: 'ngModel',
          link: function(scope, elm, attrs, ctrl) {
            let usernames=[];
            
            employeeSvc.getEmployee()
            .then(function(data){
                for(let i=0;i<data.length;i++){
                    usernames.push(data[i].username);
                }
            })
            ctrl.$asyncValidators.username = function(modelValue, viewValue) {
      
              if (ctrl.$isEmpty(modelValue)) {
                return $q.resolve();
              }
      
              var def = $q.defer();
      
              $timeout(function() {
                if (usernames.indexOf(modelValue) === -1) {
                  def.resolve();
                  
                } else {
                  def.reject();
                }
      
              }, 500);
      
              return def.promise;
            };
          }
        };
      }]);



      hrms_app.directive('email',['$q','$timeout','employeeSvc', function($q, $timeout, employeeSvc) {
        return {
          require: 'ngModel',
          link: function(scope, elm, attrs, ctrl) {
            let email=[];
            
            employeeSvc.getEmployee()
            .then(function(data){
                for(let i=0;i<data.length;i++){
                    email.push(data[i].email);
                }
            })
            ctrl.$asyncValidators.email = function(modelValue, viewValue) {
      
              if (ctrl.$isEmpty(modelValue)) {
                return $q.resolve();
              }
              var def = $q.defer();
              $timeout(function() {
                if (email.indexOf(modelValue) === -1) {
                  def.resolve();
                } else {
                  def.reject();
                }
              }, 500);
              return def.promise;
            };
          }
        };
      }]);
})();