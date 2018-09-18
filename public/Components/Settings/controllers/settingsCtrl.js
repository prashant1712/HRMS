hrms_app.controller('settingsCtrl',['$scope','settingsSvc', function($scope,settingsSvc){
    $scope.editovertimeSettings= false;
    $scope.editDeduction= false;
    $scope.deduction_settings=[];
    settingsSvc.getSettings()
    .then(function(data){
        
        for(let i=0;i<data.length;i++){
            if(data[i].type=="late"){
                $scope.deduction_settings.push(data[i]);
            }
            else if(data[i].type=="overtime")
            $scope.overtime_settings= data[i];
        }
        
        // console.log($scope.settings)
    })

    $scope.saveOvertime= function(){
        $scope.editovertimeSettings= !$scope.editovertimeSettings;
        let overtime={};
        overtime.percentValue=$scope.overtime_settings.value;
        overtime.type=$scope.overtime_settings.type;
        overtime.duration= 1;
        settingsSvc.editSettings($scope.overtime_settings._id,overtime);

    }

    $scope.makeDeduction= function(reductionForm){
        let deduction={};
        deduction.type="late"
        deduction.duration=(reductionForm.duration.$viewValue.getHours())*60;
        deduction.percentValue= reductionForm.percentValue.$viewValue;
        settingsSvc.addSettings(deduction)
        .then(function(data){
            console.log(data);
            location.reload();
        })
    }

    $scope.editDeductionSlab= function($scope,deduction, id){
        this.editDeduction= false;
        this.reduction={}
        console.log(this.editDeduction)
        let deduction_updated={};
        deduction_updated.type="late";
        deduction_updated.duration= deduction.duration.getHours()*60;
        deduction_updated.percentValue= deduction.percentValue;
        console.log(deduction_updated)
        settingsSvc.editSettings(id, deduction_updated)
        .then(function(data){
            console.log(data);
            location.reload();
        })

    }

    $scope.deleteDeduction= function(id,deduction){
        let deduction_updated={};
        let index = $scope.deduction_settings.indexOf(deduction);
        $scope.deduction_settings.splice(index,1);
        settingsSvc.deleteSettings(id)
        .then(function(data){
            console.log(data);
            location.reload();
        })
    }
}])