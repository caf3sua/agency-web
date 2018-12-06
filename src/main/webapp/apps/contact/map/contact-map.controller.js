(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactMapController', ContactMapController);


    	ContactMapController.$inject = ['$rootScope', '$scope', '$http', '$filter', '$state',
    		'ContactService', '$controller', 'ContactCommonDialogService', 'entity', 'ProductCommonService'];
        function ContactMapController($rootScope, $scope, $http, $filter, $state
        		, ContactService, $controller, ContactCommonDialogService, entity, ProductCommonService) {
        	
        	var vm = this;
        	
        	vm.contact = {
      			  "contactName": "",
      			  "contactSex": "1",
      			  "dateOfBirth": "",
      			  "email": "",
      			  "groupType": "POTENTIAL",
      			  "homeAddress": "",
      			  "idNumber": "",
      			  "listContactProduct": [],
      			  "listRelationship": [],
      			  "listReminders": [],
      			  "occupation": "",
      			  "phone": "",
      			  "facebookId" : ""
      			};
        	vm.addressContact;
        	vm.goBack = goBack;
        	
        	function goBack() {
      			$state.go("app.contact-detail", {id: vm.contact.contactId});
      		}
        	
        	angular.element(document).ready(function () {
            });

        	// Init controller
      		(function initController() {
      			// instantiate base controller
      		    console.log('Init ContactEditController');
      		    
      		    // Get object Contact
      		    vm.contact = entity;
      		    let address = vm.contact.homeAddress.split('::');
      		    vm.contactAddress = address[0] + ", " + address[1] + ", " + address[2];
      		})();
        }
})();
