hrms_app.controller('dashboardCtrl',['$rootScope','$scope','$cookies','$http','$state','loginSvc',function($rootScope,$scope,$cookies,$http,$state,loginSvc){
    $scope.dashboardReports=[]
    console.log("started in dashboard")
    $scope.logout= function(){
        $cookies.remove("token");
        $state.go('login')
    }
    $scope.dashboardReports= this.dashboardReports;
    $rootScope.showAdminView= this.showAdminView
    console.log($rootScope.showAdminView);
}])