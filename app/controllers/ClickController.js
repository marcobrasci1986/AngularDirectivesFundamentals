app.controller('clickController', function () {
    var vm = this;

    vm.data = {
        message: 'I have not been clicked'
    };

    vm.clickHandler = function (p) {
        p.message = 'I have been clicked';
    }
    vm.user1 = {
        name: 'Luke',
        selected: false
    }

});

app.directive('myClick', function ($parse) {
    return {
        link: function (scope, el, attrs) {
            var fn = $parse(attrs['myClick']); // take string that is the method and convert it to the real method
            el.on('click', function () {
                scope.$apply(function () {
                    fn(scope);
                })
            })
        }
    }
});

app.directive('userTile', function () {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            user: '=',
        },
        controller: function () {
            var userTileVm = this;

            userTileVm.select = function () {
                userTileVm.user.selected = !userTileVm.user.selected;
            }
        },
        templateUrl: './templates/userTile.html',
        controllerAs: 'userTileVm'
    }

});
