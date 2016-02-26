app.controller('mainModalController', function () {
    var vm = this;


    vm.openModal = function () {
        vm.modalOpen = true;
    }

});

app.controller('modalController', function () {
    var modalVm = this;

});

app.directive('modal', function ($document) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/modal.html',
        scope: {
            modalOpen: '=open',
            options: '=',
            onClose: '&' // function
        },
        bindToController: true,
        controller: function () {
            console.log(this.modalOpen);
        },
        link: function (scope, el, attrs, controller) {
            var options = angular.extend({
                height: '250px',
                width: '500px',
                top: '20%',
                left: '30%'
            }, controller.options);

            el.find('.modal-container').css({
                'left':options.left,
                'top':options.top,
                'height':options.height + 'px',
                'width':options.width + 'px'
            });

            var pageHeight = $document.height();
            var pageWidth = $document.width();

            el.find('.modal-blackout').css({
                'width': pageWidth + 'px',
                'height': pageHeight + 'px'
            })

        },
        controllerAs: 'modalVm'

    }
});


