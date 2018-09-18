hrms_app.controller('shiftsCtrl', ['$scope', 'shiftService', function ($scope, shiftService) {
    $scope.shift = {};
    $scope.editmode = false;
    $scope.checkShift = [];
    $scope.flag = false;
    console.log("in controller");
    $scope.getshifts = function () {

        shiftService.getShifts().then(function (data) {
            $scope.checkShift = data;
        })
    }

    $scope.getshifts();

    $scope.makeShift = function () {
        $scope.getshifts();
        console.log("adding " + $scope.shift);
        let data = $scope.shift;
        shiftService.createShifts(data).
            then(function () {
                console.log("successfully added")
            })
    }


    $scope.delete = function (index) {
        console.log(index);
        shiftService.deleteShift(index).
            then(function (data) {
                console.log(index);
                $scope.checkShift = $scope.checkShift.splice(index, 1);
                $scope.getshifts();
            })
    }

    $scope.edit = function ($scope) {
        this.editmode = !this.editmode;
    }

    $scope.makechange = function ($scope, obj) {
        this.editmode = !this.editmode;
        shiftService.editShift(obj).
            then(function (data) {
                console.log(data);
            })

    }

   
    //purana wala
    $scope.checkshifttime = function () {
        var st1 = ($scope.shift.starttime).getHours() * 60 + ($scope.shift.starttime).getMinutes();
        var et1 = ($scope.shift.endtime).getHours() * 60 + ($scope.shift.endtime).getMinutes();
        var status = true;

        console.log("st1 is" + st1);
        console.log("et1 is" + et1);
        if (st1 < et1) {
            console.log("Inside if");
            $scope.getshifts();

            for (var obj of $scope.checkShift) {
                console.log(obj)

                var new_st = obj.starttime;
                var new_date = new Date(new_st);
                var st2 = (new_date).getHours() * 60 + (new_date).getMinutes();
                var et2 = (new_date).getHours() * 60 + (new_date).getMinutes();
                console.log("st2 is" + st2);
                console.log("et2 is" + et2);
                if (et1 < st2) {
                    status = true;
                }
                else if (st1 > st2 && st1 > et2) {
                    status = true;
                }
                else {
                    status = false;
                    $scope.flag = true;
                    break;
                }

            }
            console.log(status);
            if (status == true) {
                $scope.flag = false;
                $scope.makeShift();
            }
            else {
                $scope.flag = true;
            }
        }
    }
}]);









