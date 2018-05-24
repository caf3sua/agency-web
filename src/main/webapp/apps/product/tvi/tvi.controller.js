(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTviController', ProductTviController);

    ProductTviController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope'];

    function ProductTviController ($scope, $controller, Principal, $state, $rootScope) {
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
