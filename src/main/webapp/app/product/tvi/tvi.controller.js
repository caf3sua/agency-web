(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('TviController', TviController);

    TviController.$inject = ['$scope', '$controller', 'Principal', 'LoginService', '$state', '$rootScope'];

    function TviController ($scope, $controller, Principal, LoginService, $state, $rootScope) {
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
