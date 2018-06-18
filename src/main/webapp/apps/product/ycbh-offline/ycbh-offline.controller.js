(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductYcbhOfflineController', ProductYcbhOfflineController);

    ProductYcbhOfflineController.$inject = ['$scope', '$controller', 'Principal', 'LoginService', '$state', '$rootScope'];

    function ProductYcbhOfflineController ($scope, $controller, Principal, LoginService, $state, $rootScope) {
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
