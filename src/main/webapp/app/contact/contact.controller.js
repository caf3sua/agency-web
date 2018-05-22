(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope'];

    function ContactController ($scope, Principal, LoginService, $state, $rootScope) {
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
