(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('KhcController', KhcController);

    KhcController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function KhcController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;

    }
})();
