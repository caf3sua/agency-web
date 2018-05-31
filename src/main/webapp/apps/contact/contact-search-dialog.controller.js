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
        	vm.searchCriterial = {
    			"contactName": "",
    			"handPhone": "",
    			"idNumber": "",
    			"dateOfBirth": ""
        	}
        	
        	// Implement function
        	function searchContact() {
        		console.log('searchContact');
        	}
        	
        	function addNewContact() {
        		$uibModalInstance.dismiss('cancel');
        	}
        	
        	
        	vm.ok = function () {
                $uibModalInstance.close(vm.contactCode);
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
})();
