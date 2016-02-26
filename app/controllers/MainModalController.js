app.controller('mainModalController', function () {
    var vm = this;


    vm.openModal = function () {
        vm.modalOpen = true;
    };
    
    vm.modalClosed = function (response) {
        vm.close('no');
    };

    vm.close = function (response) {
        vm.modalOpen = false;
        console.log('modal closed', response);
    }

});


app.directive('modal', function ($document) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/modal.html',
        scope: {
            modalOpen: '=open', //two way binding, is kept in sync with vm.modalOpen
            options: '=',
            onClose: '&' // function
        },
        bindToController: true,
        controller: function () {
            this.close = function () {
                this.modalOpen = false;
                this.onClose();
            }
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


