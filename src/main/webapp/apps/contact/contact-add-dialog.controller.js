(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactAddDialogController', ContactAddDialogController);


    	ContactAddDialogController.$inject = ['$scope', '$http', '$filter', '$uibModalInstance', 'ContactService'];
        function ContactAddDialogController($scope, $http, $filter, $uibModalInstance, ContactService) {
        	
        	var vm = this;
        	
        	vm.addNewContact = addNewContact;
        	vm.selectedContact = selectedContact;
        	
        	vm.contactAdd = {
			  "contactId": "",
			  "contactName": "Name6415",
			  "contactSex": "1",
			  "dateOfBirth": "24/06/1989",
			  "email": "email@gmai.com",
			  "group": "POTENTIAL",
			  "homeAddress": "71 Ngô Sĩ Liên",
			  "idNumber": "141410101112",
			  "listRelationship": [
			    {
			      "customerId": "",
			      "customerIdParrent": "",
			      "customerName": "",
			      "customerNameParrent": "",
			      "id": "",
			      "relationId": "",
			      "relationName": ""
			    }
			  ],
			  "listTarget": [
			    "string"
			  ],
			  "phone": "0988777666",
			  "occupation": "Nghề nghiệp"
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
        	
        	
        	function addNewContact() {
        		console.log('addNewContact');
        		
        		ContactService.create(vm.contactAdd, onSuccess, onError);
        		
        		function onSuccess(result) {
        			toastr.success('Success!', 'Successful!');
        			$uibModalInstance.dismiss('cancel');
        		}
        		
        		function onError(result) {
        			toastr.error('Error!', 'Error');
        			$uibModalInstance.dismiss('cancel');
        		}
        	}
        	
        }
})();
