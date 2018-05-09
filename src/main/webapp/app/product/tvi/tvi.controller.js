(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('TviController', TviController);

    TviController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function TviController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;

    }
})();
