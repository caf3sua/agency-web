(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('ProductCarController', ProductCarController);

    ProductCarController.$inject = ['$scope', '$controller', 'Principal', 'LoginService', '$state', '$rootScope'];

    function ProductCarController ($scope, $controller, Principal, LoginService, $state, $rootScope) {
        var vm = this;

        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('AgencyBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.productCar = {};
  		vm.enableOptions = enableOptions;
  		
  		
  		// Function
  		function enableOptions(checkBox) {
  			console.log(vm.productCar)
  			switch(checkBox.id) {
  				case 'INSURANCE_TARGET':
  					break;
  				case 'INSURANCE_TYPE_FORCE':
  					break;
  				case 'INSURANCE_TYPE_VOLUNTEER':
  					break;
  				case 'INSURANCE_TYPE_ACCIDENT':
  					break;
  				case 'INSURANCE_TYPE_RESOURCE':
  					break;
  			}
  		}
    }
})();
