(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('HhvcController', HhvcController);

    HhvcController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function HhvcController ($scope, Principal, LoginService, $state, $rootScope) {
        var vm = this;

    }
})();
