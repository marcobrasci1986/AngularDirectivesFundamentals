app.controller('transcludeComplexController', function () {
    var vm = this;

    vm.items = [1, 3, 6, 7, 68];

    vm.bountyHunters = [
        {
            name: 'Bob Fett'
        },
        {
            name: 'IG-88'
        },
        {
            name: 'Denga'
        },
        {
            name: 'Bossk'
        },
        {
            name: 'Cad Bane'
        }
    ];

    vm.add = function () {
        vm.bountyHunters.push({name: '4LOM'})
    }
    vm.remove = function () {
        vm.bountyHunters.length--;
    }
});

app.directive('userList', function () {
    return {
        restrict: 'A',
        transclude: 'element',
        link: function (scope, el, attrs, controller, transclude) {
            var pieces = attrs.userList.split(' ');
            var itemString = pieces[0];
            var collectionName = pieces[2];
            var elements = [];
            /**
             * el = comment
             */
            scope.$watchCollection(collectionName, function (collection) {
                if (elements.length > 0) {
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].el.remove();
                        elements[i].scope.$destroy();
                    }
                    elements = [];
                }

                for (var i = 0; i < collection.length; i++) {
                    var childScope = scope.$new();
                    childScope[itemString] = collection[i];

                    transclude(childScope, function (clone) {
                        el.before(clone);
                        var item = {};
                        item.el = clone;
                        item.scope = childScope;
                        elements.push(item);
                    })
                }
            })
        }
    }
});

app.directive('myLazyRender', function () {
    return {
        restrict: 'A',
        transclude: 'element',
        priority: 1200,
        link: function (scope, el, attrs, controller, transclude) {
            var hasBeenShown = false;
            var unwatchFn = scope.$watch(attrs.myLazyRender, function (newValue) {
                if (newValue && !hasBeenShown) {
                    hasBeenShown = true;
                    transclude(scope, function (clone) {
                        el.after(clone);
                    });
                    unwatchFn();
                }
            });
        }
    }
});

app.directive('echo', function () {

    return {
        priority: 900,
        link: function () {
            console.log('echo');
        }
    }
});


