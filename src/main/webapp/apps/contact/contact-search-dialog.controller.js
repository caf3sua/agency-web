(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactSearchDialogController', ContactSearchDialogController);


    	ContactSearchDialogController.$inject = ['$scope', '$state', '$http', '$filter', '$uibModalInstance', 'ContactService'];
        function ContactSearchDialogController($scope, $state, $http, $filter, $uibModalInstance, ContactService) {
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
        			let count = 1;
        			angular.forEach(result, function(value, key) {
        				value.id = count;
        				count++;
      			 	});
        			vm.contacts = result;
        		}
        		
        		function onError(result) {
        			
        		}
        	}
        	
        	function addNewContact() {
        		$uibModalInstance.dismiss('cancel');
        		$state.go('app.contact-new');
        	}
        	
        	vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
})();
