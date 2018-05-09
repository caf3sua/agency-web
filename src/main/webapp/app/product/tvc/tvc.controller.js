(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('TvcController', TvcController);

    TvcController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function TvcController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;

    }
})();
