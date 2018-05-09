(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function HomeController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;

    }
})();
