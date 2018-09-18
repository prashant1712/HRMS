hrms_app.controller('salaryComponentCtrl',['$scope','SalaryComponentSvc', function($scope,SalaryComponentSvc){
    $scope.component_details=[];
    $scope.isLoading= true;
    $scope.show_editable_component=false;
    let oldValue=[];
    let newValue=[];
    $scope.component={};    
    $scope.component.type= 'allowance';
    $scope.component.valueType='INR';
    $scope.setComponentValueType= function($scope,value){
        this.component.valueType=value;
    }
    
    $scope.setComponentType= function($scope,value){
        this.component.type= value;
        console.log(this.component.type)
    }

    SalaryComponentSvc.getSalaryComponents()
    .then(function(data){
        $scope.component_details= data;
        $scope.isLoading= false;
         console.log($scope.component_details);
    })
    
    $scope.saveEdit= function($scope,edited_component){
        this.show_editable_component= !this.show_editable_component;
        SalaryComponentSvc.saveData(edited_component);
    };
   

    $scope.removeDetail= function(index){
        SalaryComponentSvc.removeComponent(index)
            .then(function(data){
                
                $scope.component_details= $scope.component_details.splice(index,1);
                location.reload();
                
            })
    }


}])