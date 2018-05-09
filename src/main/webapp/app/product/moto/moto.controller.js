(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('MotoController', MotoController);

    MotoController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function MotoController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;

    }
})();
