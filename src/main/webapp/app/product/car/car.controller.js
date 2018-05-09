(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('CarController', CarController);

    CarController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function CarController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;

    }
})();
