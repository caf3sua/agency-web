(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('CartController', CartController);

    CartController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function CartController ($scope, Principal, LoginService, $state, $rootScope) {
    	var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  		})();
  		
  		// Properties & function declare
  		
  		
  		// Function
    }
})();
