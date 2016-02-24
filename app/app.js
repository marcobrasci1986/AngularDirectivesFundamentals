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
            user: '=person', // object to pass in.
            initialCollapsed: '@collapsed' // only String values
        },
        controller: function () {
            var userVm = this;
            userVm.collapsed = (userVm.initialCollapsed === 'true');

            userVm.knightMe = function (user) {
                user.rank = 'Knight';
            };
            userVm.collapse = function () {
                userVm.collapsed = !userVm.collapsed;
            };

            userVm.removeFriend = function (friend) {
                var index = userVm.user.friends.indexOf(friend);
                if (index > -1) {
                    userVm.user.friends.splice(index, 1);
                }
            }


        },
        controllerAs: 'userVm'
    }

});
app.directive('removeFriend', function () {
    return {
        restrict: 'E',
        templateUrl: './templates/remove-friend.html',
        scope: {},
        bindToController: {
            user: '=',
            notifyParent: '&method' // function
        },
        controller: function () {
            var removeFriendVm = this;
            console.log(this.user);

            removeFriendVm.removing = false;
            removeFriendVm.startRemove = function () {
                removeFriendVm.removing = true;
            };
            removeFriendVm.cancelRemove = function () {
                removeFriendVm.removing = false;
            };
            removeFriendVm.confirmRemove = function () {
                removeFriendVm.notifyParent();
            };
        },
        controllerAs: 'removeFriendVm'
    }
});
app.directive('address', function () {
    return {
        restrict: 'E',
        bindToController: true,
        templateUrl: './templates/address.html',
        controller: function () {

            var addressVm = this;
            addressVm.collapsed = false;

            addressVm.collapseAddress = function () {
                addressVm.collapsed = true;
            };
            addressVm.expandAddress = function () {
                addressVm.collapsed = false;
            };
        },
        controllerAs: 'addressVm'
    }
});

