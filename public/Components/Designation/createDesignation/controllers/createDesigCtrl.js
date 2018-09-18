'use strict';

angular.module("hrms")
  .controller("createDesigCtrl", ['SalaryComponentSvc', 'designationSvc', '$scope', '$timeout', '$state',
    function (SalaryComponentSvc, designationSvc, $scope, $timeout, $state) {


      $scope.selectedSalaries = [];

      SalaryComponentSvc.getSalaryComponents()
      .then(function (data) {
        $scope.availableSalaries = data;
        console.log($scope.availableSalaries)
      });
      $scope.availableSalaries= this.availableSalaries;
      // $scope.update = function(index, item, external, type) {
      //   updateTotal();
      // }

      $scope.updateTotal = function () {
        console.log('Inside update total');
        
        $timeout(function () {
          $scope.total = parseInt($scope.basicAmount);
          for (let i = 0; i < $scope.selectedSalaries.length; i++) {

            console.log($scope.selectedSalaries[i]);
            if ($scope.selectedSalaries[i].type == 'allowance') {
              if ($scope.selectedSalaries[i].valueType=="percent") {
                $scope.total = parseInt($scope.total) + parseInt($scope.selectedSalaries[i].value) * parseInt($scope.basicAmount) / 100;
              }
              else
                $scope.total = parseInt($scope.total) + parseInt($scope.selectedSalaries[i].value);

            }
            else {
              if ($scope.selectedSalaries[i].valueType=="percent") {
                $scope.total = parseInt($scope.total) - parseInt($scope.selectedSalaries[i].value) * parseInt($scope.basicAmount) / 100;
              }
              else
                $scope.total = parseInt($scope.total) - parseInt($scope.selectedSalaries[i].value);
            }
          }
        }, 500);
      };


      //Set total to basic amount initially
      $scope.total = parseInt($scope.basicAmount);


      
      $scope.addDesignation = function () {
        var newDesignation = {};
        newDesignation.name = $scope.designationName;
        newDesignation.totalSalary= $scope.total;
        newDesignation.basic_salary= $scope.basicAmount;
        newDesignation.salary_components = $scope.selectedSalaries;
        designationSvc.createDesignation(newDesignation)
        .then(success, failed);

        function success() {
          console.log("Designation added successfully");
          $scope.designationSuccess = true;
          $timeout(function () {
            $state.go("view_designations");
          }, 1000)
        };

        function failed() {
          $scope.designationFailed = true;
          $timeout(function () {
            $state.go("dashboard");
          }, 1000)
        };
      };

      //Remove item from selected salaries
      $scope.remove = function (id) {
        for (let i = 0; i < $scope.selectedSalaries.length; i++) {
          if ($scope.selectedSalaries[i]._id === id) {
            $scope.availableSalaries.push($scope.selectedSalaries[i])
            $scope.selectedSalaries.splice(i, 1);
          }
        } 
        $scope.updateTotal();
      };


      $scope.cancelDesig = function() {
        $state.go('dashboard');
      }

    }]);

