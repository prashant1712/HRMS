hrms_app.controller("componentModalCtrl", ['$scope', '$uibModal', '$log','SalaryComponentSvc', function ($scope, $uibModal, $log,SalaryComponentSvc) {

    $scope.add_salary_component = function () {
        console.log("Show Form Button Clicked");
        
        var modalInstance = $uibModal.open({
            templateUrl: 'Components/Salary/Modal/SalaryComponent/component-modal.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
        });
       
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
}]);

let ModalInstanceCtrl = function ($scope, $uibModalInstance,SalaryComponentSvc) {

$scope.component={};
$scope.component.component_type= 'allowance';
$scope.component.component_valuetype='INR';

$scope.setComponentValueType= function(value){
    $scope.component.component_valuetype=value;
}

$scope.setComponentType= function(value){
    $scope.component.component_type= value;
    console.log($scope.component.component_type)
}

$scope.show = function (salaryComponent) {
     let new_salary_component={};
    console.log(salaryComponent);
    if (salaryComponent.$valid) {
        new_salary_component.name= salaryComponent.name.$viewValue;
        new_salary_component.value= salaryComponent.value.$viewValue;
        new_salary_component.valueType= $scope.component.component_valuetype;
        new_salary_component.type= $scope.component.component_type;
        console.log('salary form is in scope');
        $uibModalInstance.close('closed');
    } 
    else {
        console.log('salaryComponent is not in scope');
        alert("Please enter Valid Details");
    }
    
    SalaryComponentSvc.createSalaryComponent(new_salary_component)
    .then(function(data){
        location.reload();
    })
};


$scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
};
};