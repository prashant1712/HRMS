
hrms_app.controller('viewDesignationCtrl',['$rootScope','$scope','designationSvc','SalaryComponentSvc',function($rootScope,$scope,designationSvc,SalaryComponentSvc){
        
       
        console.log($scope.inEmployee)
        $scope.designations=[];
        
        let designationDetails=[];
        $scope.assigned_components=[];
        $scope.designationDetail={};
        $scope.editedComponent={
            value: 0,
            valueType:"INR"
        };
        $scope.showDnd= false;
        $scope.editMode=false;
        
        designationSvc.getDesignation()
            .then(function(data){
                $scope.selected_designation= undefined;
                designationDetails= data;
                for(let i=0;i<data.length;i++){
                    $scope.assigned_components=data.salary_components;
                    $scope.designations.push(data[i].name);
                }
                console.log(data);
            });

        SalaryComponentSvc.getSalaryComponents()
        .then(function(data){
            $scope.component_details= data;
            $scope.itemsDrag= $scope.component_details;
        })
        
        $scope.setComponentValueType= function(value){
            $scope.editedComponent.valueType=value;
        }
        $scope.togglednd= function(){
            $scope.showDnd= !$scope.showDnd;
            $scope.$emit("dndFlag",$scope.showDnd);
        }
        $scope.$emit('dndFlag',$scope.showDnd);
       


        $scope.submit= function(designationName){
            $scope.assigned_components=[];
            for(let i=0;i<designationDetails.length;i++){
                if(designationDetails[i].name== designationName.designation.$viewValue){
                    $scope.designationDetail= designationDetails[i];
                    $scope.$emit('designationSelected',designationName.designation.$viewValue);
                }
            }
            console.log($scope.assigned_components);
            
        }

        $scope.added_component= function(index){
            let component_added=$scope.component_details.splice(index,1);
            console.log(component_added[0])
            for(let i=0;i<component_added.length;i++){
                if(component_added[i].type==="allowance"){
                    if(component_added[i].valueType==="percent")
                    $scope.designationDetail.totalSalary=parseFloat($scope.designationDetail.totalSalary)+(parseFloat($scope.designationDetail.basic_salary)*parseFloat(component_added[i].value))/100;
                    else 
                    $scope.designationDetail.totalSalary= parseFloat($scope.designationDetail.totalSalary) + parseFloat(component_added[i].value);
                                    }
                else{
                
                    if(component_added[i].valueType==="percent"){
                        $scope.designationDetail.totalSalary=parseFloat($scope.designationDetail.totalSalary)-(parseFloat($scope.designationDetail.basic_salary)*parseFloat(component_added[i].value))/100;
                    }
                    else{
                    $scope.designationDetail.totalSalary= parseFloat($scope.designationDetail.totalSalary) - parseFloat(component_added[i].value);
                
                    }
                }
            }
            $scope.$emit("assignedComponentsChanged",$scope.designationDetail);
            console.log($scope.designationDetail.totalSalary)

        }

        $scope.removed_component= function(index){
            console.log("in callback")
            
            let component_removed=$scope.designationDetail.salary_components.splice(index,1);
            console.log(component_removed[0]);
            for(let i=0;i<component_removed.length;i++){
                if(component_removed[i].type==="allowance"){
                    if(component_removed[i].valueType==="percent")
                    $scope.designationDetail.totalSalary=parseFloat($scope.designationDetail.totalSalary)-(parseFloat($scope.designationDetail.basic_salary)*parseFloat(component_removed[i].value))/100;
                    else 
                    $scope.designationDetail.totalSalary= parseFloat($scope.designationDetail.totalSalary)- parseFloat(component_removed[0].value);
                }
                else{
                
                    if(component_removed[i].valueType==="percent"){
                        $scope.designationDetail.totalSalary=parseFloat($scope.designationDetail.totalSalary)+(parseFloat($scope.designationDetail.basic_salary)*parseFloat(component_removed[i].value))/100;
                    }
                    else{
                    $scope.designationDetail.totalSalary= parseFloat($scope.designationDetail.totalSalary) + parseFloat(component_removed[i].value);
                
                    }
                }
            }
            $scope.$emit("assignedComponentsChanged",$scope.designationDetail);
            console.log($scope.designationDetail.totalSalary);
        }

        $scope.saveEditedComponents= function(){
            let edited_designation={}
            edited_designation.name= $scope.designationDetail.name;
            edited_designation.totalSalary= $scope.designationDetail.totalSalary;
            edited_designation.basic_salary=$scope.designationDetail.basic_salary ;
            edited_designation.salary_components= $scope.designationDetail.salary_components;
            console.log(edited_designation)
            designationSvc.saveData($scope.designationDetail._id,edited_designation)
            .then(function(data){
                console.log(data);
            })
        }

        

}])
