hrms_app.directive('shiftname', ['$q', '$timeout', 'shiftService', function ($q, $timeout, shiftService) {

    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            let shiftname = [];
            shiftService.getShifts()
                .then(function (data) {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        shiftname.push(data[i].name);

                    }
                })
            ctrl.$asyncValidators.shiftname = function (modelValue, viewValue) {

                if (ctrl.$isEmpty(modelValue)) {
                    return $q.resolve();
                }

                var def = $q.defer();

                $timeout(function () {
                    if (shiftname.indexOf(modelValue) === -1) {
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
