(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductHomeController', ProductHomeController);

    ProductHomeController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope'];

    function ProductHomeController ($scope, $controller, Principal, $state, $rootScope) {
    	var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		
  		
  		// Function

    }
})();
