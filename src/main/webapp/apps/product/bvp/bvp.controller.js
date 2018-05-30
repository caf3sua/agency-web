(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductBvpController', ProductBvpController);

    ProductBvpController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope'];

    function ProductBvpController ($scope, $controller, Principal, $state, $rootScope) {
    	var vm = this;
        vm.tvc ={
        };
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
