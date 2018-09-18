hrms_app.controller('loginCtrl',['$scope','$cookies','$http','$state','loginSvc','employeeSvc','$ngBootbox',function($scope,$cookies,$http,$state,loginSvc,employeeSvc,$ngBootbox){
    $scope.message=""
    $scope.logIn= function(){
        let user={};
        
        // console.log(login_form.username.value)
        user.username= login_form.username.value;
        user.password= login_form.password.value;
        loginSvc.getLogin(user)
        .then(function(data){
            $scope.message="You have been successfully logged in"
            let tokenStr= $cookies.get('token')
            $http.defaults.headers.common={'Authorization': tokenStr}
            $state.go('dashboard')
        })
        .catch(function(err){
            $scope.message="Invalid username or password"
            console.log(err.status);
        })

        $ngBootbox.alert({
            callback: function () {
                console.log('This was logged in the callback!');
            }
        })
     }
    

}])