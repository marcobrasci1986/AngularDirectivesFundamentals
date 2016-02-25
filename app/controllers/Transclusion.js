app.controller('transclusionController', function () {
    var vm = this;

    vm.message = 'My message';

});

app.directive('displayBox', function ($parse) {
    return {
        restrict: 'E',
        templateUrl: '../templates/displayBox.html',
        controller: function () {
            var displayBoxVm = this;

            displayBoxVm.hidden = false;
            displayBoxVm.close = function () {
                displayBoxVm.hidden = true;
            }

        },
        controllerAs: "displayBoxVm",
        transclude: true
    }
});


