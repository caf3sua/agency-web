(function() {
    'use strict';

    angular
        .module('app')
        .controller('DocumentController', DocumentController);

    DocumentController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope'];

    function DocumentController ($scope, $controller, Principal, $state, $rootScope) {
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
