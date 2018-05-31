(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactAddDialogController', ContactAddDialogController);


    	ContactAddDialogController.$inject = ['$scope', '$http', '$filter', '$uibModalInstance', 'ContactService'];
        function ContactAddDialogController($scope, $http, $filter, $uibModalInstance, ContactService) {
        	var vm = this;
        	vm.contactCode;
        	vm.searchContact = searchContact;
        	vm.addNewContact = addNewContact;
        	vm.selectedContact = selectedContact;
        	vm.searchCriterial = {
    			"contactName": "",
    			"phone": "",
    			"idNumber": "",
    			"dateOfBirth": ""
        	}
        	vm.contacts = [];
        	vm.contactsInit = [];
        	
        	angular.element(document).ready(function () {
            });

        	// Init controller
      		(function initController() {
      			// instantiate base controller
      		    console.log('Init ContactAddDialogController');
      		})();
      		
        	// Implement function
        	function selectedContact(row) {
        		console.log('selected contact:' + row);
        		$uibModalInstance.close(row);
        	}
        	
        	function searchContact() {
        		console.log('searchContact');
        		
        		ContactService.search(vm.searchCriterial, onSuccess, onError);
        		
        		function onSuccess(result) {
        			vm.contacts = result;
        		}
        		
        		function onError(result) {
        			
        		}
        	}
        	
        	function addNewContact() {
        		$uibModalInstance.dismiss('cancel');
        	}
        	
        	
//        	vm.ok = function () {
//                $uibModalInstance.close(vm.contactCode);
//            };
//
//            vm.cancel = function () {
//                $uibModalInstance.dismiss('cancel');
//            };
        }
})();
