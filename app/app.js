var app = angular.module('app', []);

app.controller('mainCtrl', function () {
    var vm = this;
    vm.person1 = {
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

    vm.person2 = {
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

    vm.droid1 = {
        name: 'R2-D2',
        specifications: {
            manufacturer: 'Industrial Automation',
            type: 'Astromech',
            productLine: 'R2 series'
        },
        level: 1
    }


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


app.directive('userPanel', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: './templates/userPanel.html',
        bindToController: {
            name: '@',
            level: '=',
            initialCollapsed: '@collapsed'
        },
        controller: function () {
            this.collapsed = (this.initialCollapsed === 'true');

            this.nextState = function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                this.level++;
                this.level = this.level % 4;
            };
            this.collapse = function () {
                this.collapsed = !this.collapsed;
            };
        },
        controllerAs: 'userVm'
    }
});

/**
 * bindToController:
 * http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html
 */
app.directive('personInfoCard', function () {
    return {
        templateUrl: './templates/personInfoCard.html',
        restrict: 'E',
        scope: {
            person: '=', // object to pass in.
            initialCollapsed: '@collapsed' // only String values, one way
        },
        bindToController: true,
        controller: function () {
            this.knightMe = function (person) {
                person.rank = 'Knight';
            };
            this.removeFriend = function (friend) {
                var index = this.person.friends.indexOf(friend);
                if (index > -1) {
                    this.person.friends.splice(index, 1);
                }
            };
        },
        controllerAs: 'personVm'
    }

});

app.directive('droidInfoCard', function () {
    return {
        templateUrl: './templates/droidInfoCard.html',
        restrict: 'E',
        bindToController: {
            droid: '=', // object to pass in.
            initialCollapsed: '@collapsed' // only String values
        },
        controller: function () {

        },
        controllerAs: 'droidVm'
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
            this.removing = false;
            this.startRemove = function () {
                this.removing = true;
            };
            this.cancelRemove = function () {
                this.removing = false;
            };
            this.confirmRemove = function () {
                this.notifyParent();
            };
        },
        controllerAs: 'removeFriendVm'
    }
});
app.directive('address', function () {
    return {
        restrict: 'E',
        templateUrl: './templates/address.html',
        scope: {},
        bindToController: {
            personAddress: '=',
            name: '='
        },
        controller: function () {
            this.collapsed = false;
            this.collapseAddress = function () {
                this.collapsed = true;
            };
            this.expandAddress = function () {
                this.collapsed = false;
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

