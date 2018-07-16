(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactHistoryPurchaseController', ContactHistoryPurchaseController);


    ContactHistoryPurchaseController.$inject = ['$rootScope', '$scope', '$http', '$filter',
    		'ContactService','$controller'];
        function ContactHistoryPurchaseController($rootScope, $scope, $http, $filter
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
