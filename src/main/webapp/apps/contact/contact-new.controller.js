(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactNewController', ContactNewController);


    	ContactNewController.$inject = ['$scope', '$http', '$filter',
    		'ContactService', 'MessageService'];
        function ContactNewController($scope, $http, $filter
        		, ContactService, MessageService) {
        	
        	var vm = this;
        	
        	vm.createNewContact = createNewContact;
        	
        	vm.contact = {
			  "contactId": "",
			  "contactName": "Name6415",
			  "contactSex": "1",
			  "dateOfBirth": "24/06/1989",
			  "email": "email@gmai.com",
			  "groupType": "POTENTIAL",
			  "homeAddress": "71 Ngô Sĩ Liên",
			  "idNumber": "141410101112",
//			  "listRelationship": [
//			    {
//			      "customerId": "",
//			      "customerIdParrent": "",
//			      "customerName": "",
//			      "customerNameParrent": "",
//			      "id": "",
//			      "relationId": "",
//			      "relationName": ""
//			    }
//			  ],
//			  "listTarget": [
//			    "string"
//			  ],
			  "phone": "0988777666",
			  "occupation": "Nghề nghiệp"
			}
        	
        	angular.element(document).ready(function () {
            });

        	// Init controller
      		(function initController() {
      			// instantiate base controller
      		    console.log('Init ContactNewController');
      		})();
      		
        	// Implement function
        	
        	function createNewContact() {
        		console.log('createNewContact');
        		
        		ContactService.create(vm.contact, onSuccess, onError);
        		
        		function onSuccess(result) {
        			MessageService.showSuccessMessage('Tạo khách hàng thành công');
//        			toastr.success('Success!', 'Successful!');
        		}
        		
        		function onError(result) {
        			toastr.error('Error!', 'Error');
        		}
        	}
        	
        }
})();
