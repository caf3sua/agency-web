(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('TvcController', TvcController);

    TvcController.$inject = ['$scope', '$controller', 'Principal', 'LoginService', '$state', '$rootScope'];

    function TvcController ($scope, $controller, Principal, LoginService, $state, $rootScope) {
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
