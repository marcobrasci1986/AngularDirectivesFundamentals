app.controller('masterDetailController', function () {
    var vm = this;

    vm.users = [
        {name: 'Luke', planet: 'Tatooine', job: 'Jedi'},
        {name: 'Han', planet: 'Nowhere', job: 'Jedi'},
        {name: 'Chewbacca', planet: 'Kashyyyk', job: 'CoPilot'}
    ]

});

app.directive('masterUsers', function (userListStateService) {
    return {
        scope: {
            users: '=data'
        },
        bindToController: true,
        templateUrl: 'templates/masterUsers.html',
        controller: function () {
            this.state = userListStateService;
            userListStateService.selectedUser = this.users[0];

        },
        controllerAs: "masterVm"
    }
});

app.directive('detailUsers', function (userListStateService) {
    return {
        scope: {
            users: '=data'
        },
        bindToController: true,
        controller: function () {
            this.state = userListStateService;
        },
        templateUrl: 'templates/detailUsers.html',
        controllerAs: "detailVm"
    }
});


