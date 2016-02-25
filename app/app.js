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
        ],
        level: 0
    };

    vm.user2 = {
        name: 'Han Solo',
        address: {
            street: 'Kerkstraat',
            city: 'Brussel',
            planet: 'Yavin 4'
        },
        friends: [
            'Luke',
            'Chewbacca',
            'Leia'
        ],
        level: 1
    };


});

app.directive('stateDisplay', function () {
    return {
        link: function (scope, el, attrs) {
            var params = attrs['stateDisplay'].split(' ');
            var linkVar = params[0];

            var classes = params.splice(1);
            /**
             * Save a reference to previous class, we need to remove this class
             * @type {undefined}
             */
            var previousClass = undefined;

            scope.$watch(linkVar, function (newVal) {
                if (previousClass) {
                    el.removeClass(previousClass);
                }
                var newClass = classes[newVal];
                el.addClass(newClass);
                previousClass = newClass;
            });
        }
    }
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
            };

            userVm.nextState = function () {
                userVm.user.level++;
                userVm.user.level = userVm.user.level % 4;
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

////////////////////////////////////////////////////////
app.controller('decoratorCtrl', function () {
    var vm = this;

    vm.messages = [];
    vm.handlePause = function (e) {
        console.log(e);
        vm.messages.push({text: 'paused'});
        console.log('paused !');
    }
});

app.directive('eventPause', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            var fn = $parse(attrs['eventPause']);
            /**
             * Event is fired outside of Angular digest circle.
             * Event = pause event of video element
             */
            el.on('pause', function (event) {
                scope.$apply(function () {
                    fn(scope, {evt: event});
                });
            });
        }
    }
});

app.directive('spacebarSupport', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            $('body').on('keypress', function (evt) {
                var vidEl = el[0];
                if (evt.keyCode === 32) {
                    if (vidEl.paused) {
                        vidEl.play();
                    } else {
                        vidEl.pause();
                    }
                }
            })
        }

    }
});

