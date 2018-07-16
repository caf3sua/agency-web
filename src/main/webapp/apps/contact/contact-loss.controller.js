(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactLossController', ContactLossController);


    ContactLossController.$inject = ['$rootScope', '$scope', '$http', '$filter',
    		'ContactService','$controller'];
        function ContactLossController($rootScope, $scope, $http, $filter
        		, ContactService, $controller) {
        	
        	var vm = this;
        	
        	// variable
        	angular.element(document).ready(function () {
            });

        	// Init controller
      		(function initController() {
      			// instantiate base controller
      		    console.log('Init ContactNewController');
      		})();
      		
      		// function
      		
        }
})();
