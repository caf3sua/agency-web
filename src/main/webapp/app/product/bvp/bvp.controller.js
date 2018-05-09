(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('BvpController', BvpController);

    BvpController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function BvpController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;

    }
})();
