(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductHhvcController', ProductHhvcController);

    ProductHhvcController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope'];

    function ProductHhvcController ($scope, $controller, Principal, $state, $rootScope) {
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