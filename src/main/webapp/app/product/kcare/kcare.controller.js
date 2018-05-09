(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('KcareController', KcareController);

    KcareController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function KcareController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;

    }
})();
