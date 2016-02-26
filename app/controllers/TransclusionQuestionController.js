app.controller('transclusionQuestionController', function () {
    var vm = this;

    vm.baseLocation = 'Yapa 4';

});

app.directive('myQuestion', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/myQuestion.html',
        scope: {},
        bindToController: {
            questionText: '@q'
        },
        controller: function () {
            var questionVm = this;
        },
        controllerAs: 'questionVm'

    }
});


