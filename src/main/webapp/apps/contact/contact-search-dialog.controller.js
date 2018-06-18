(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactSearchDialogController', ContactSearchDialogController);


    	ContactSearchDialogController.$inject = ['$scope', '$http', '$filter', '$uibModalInstance', 'ContactService'];
        function ContactSearchDialogController($scope, $http, $filter, $uibModalInstance, ContactService) {
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
        	
        	vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
})();
