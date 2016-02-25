app.controller('communicationController', function () {
    var vm = this;
});

app.directive('emperor', function () {
    var name = 'The Emperor';
    return {
        controller: function () {
            this.name = name;
        },
        link: function (scope, el, attrs) {
            el.data('name', name);
        }

    }
});

app.directive('vader', function () {
    var name = 'Vader';
    return {
        require: '^emperor',
        controller: function () {
            this.name = name;
        },
        link: function (scope, el, attrs, emperorController) {
            el.data('name', name);
            el.data('master', emperorController.name);
            console.log('Vaders master is %s', emperorController.name);
        }

    }
});

app.directive('starkiller', function () {
    return {
        require: '^vader',
        link: function (scope, el, attrs, vaderController) {
            el.data('name', 'Starkiller');
            el.data('master', vaderController.name);
            console.log('Starkillers master is %s', vaderController.name);
        }

    }
});


