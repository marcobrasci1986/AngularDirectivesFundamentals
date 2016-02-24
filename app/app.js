var app = angular.module('app', []);

app.controller('mainCtrl', function () {
    var vm = this;
    vm.user1 = {
        name: 'Luke Skywalker',
        address: {
            street: 'PO Box 123',
            city: 'Secret Rebel Base',
            planet: 'Yavin 4',
        },
        friends: [
            'Han',
            'Leia',
            'Chewbacca'
        ]
    };

    vm.user2 = {
        name: 'Han Solo',
        address: {
            street: 'Kerkstraat',
            city: 'Brussel',
            planet: 'Yavin 4',
        },
        friends: [
            'Luke',
            'Chewbacca',
            'Leia',
        ]
    };

    console.log('Scope', vm);

});

/**
 * bindToController:
 * http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html
 */
app.directive('userInfoCard', function () {
    return {
        templateUrl: './templates/userInfoCard.html',
        restrict: 'E',
        scope: {},
        bindToController: {
            user: '='
        },
        controller: function () {
            var userVm = this;
            userVm.knightMe = function (user) {
                user.rank = 'Knight';
            }
        },
        controllerAs: 'userVm'
    }

});
