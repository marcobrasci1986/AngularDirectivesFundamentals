app.controller('requireController', function () {
    var vm = this;


});

app.directive('swTabstrip', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        templateUrl: 'templates/swTabstrip.html',
        controller: function () {
            this.name = "marco";
            this.panes = [];

            this.select = function (pane) {
                pane.selected = true;
                this.panes.forEach(function (currentPane) {
                    if (currentPane !== pane) {
                        currentPane.selected = false;
                    }

                })
            };

            this.addPane = function (pane) {
                this.panes.push(pane);
                if(this.panes.length == 1){
                    pane.selected = true;
                }
            }
        },
        controllerAs: 'tabVm'

    }
});

app.directive('swPane', function () {
    var pane;
    return {
        restrict: 'E',
        transclude: true,
        scope: {title: '@'},
        bindToController: true,
        require: '^swTabstrip',
        link: function (scope, el, attrs, tabstripController) {
            tabstripController.addPane(pane);
        },
        controller: function () {
            pane = this;
        },
        templateUrl: 'templates/swPane.html',
        controllerAs: 'paneVm'

    }
});


