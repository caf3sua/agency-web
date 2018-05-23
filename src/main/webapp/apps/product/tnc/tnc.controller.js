(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('ProductTncController', ProductTncController);

    ProductTncController.$inject = ['$scope', '$controller', 'Principal', 'LoginService', '$state', '$rootScope'];

    function ProductTncController ($scope, $controller, Principal, LoginService, $state, $rootScope) {
    	var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('AgencyBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		
  		
  		// Function

    }
})();
