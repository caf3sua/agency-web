(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductPrintedPaperController', ProductPrintedPaperController);

    ProductPrintedPaperController.$inject = ['$scope', '$stateParams', '$controller', 'Principal', '$state', '$rootScope'];

    function ProductPrintedPaperController ($scope, $stateParams, $controller, Principal, $state, $rootScope) {
        var vm = this;

        vm.policy = {};
        // Properties & function declare
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		    
  		    console.log($stateParams.productCode);
			vm.policy.productCode = $stateParams.productCode;
  		})();
  		
  		// Function
  		
    }
})();
