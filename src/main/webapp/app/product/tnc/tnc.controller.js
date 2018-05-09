(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('TncController', TncController);

    TncController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function TncController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;

    }
})();
