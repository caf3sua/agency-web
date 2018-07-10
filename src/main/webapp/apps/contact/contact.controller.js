(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactController', ContactController);


    ContactController.$inject = ['$scope', '$http', '$filter', 'ContactService', 'ContactCommonDialogService'];
    function ContactController($scope, $http, $filter, ContactService, ContactCommonDialogService) {
    	var vm = this;
    	vm.contacts = [];
    	vm.selectedContact = null;
    	vm.groupType = 'POTENTIAL';
    	vm.Agreements = [];
    	vm.AgreementsInit = [];
    	
    	// Function declare
    	vm.changeGroupType = changeGroupType;
    	vm.getAgrement = getAgrement;
    	vm.selectContact = selectContact;
    	vm.openMailDialog = openMailDialog;
    	
    	angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			loadAll();
  		})();
  		
    	// Implement function
  		function openMailDialog() {
  			ContactCommonDialogService.openMailDialog();
  		}
  		
  		function changeGroupType(type) {
  			vm.groupType = type;
  			resetSelectContact();
  		}
  		
  		function resetSelectContact() {
  			vm.selectedContact = null;
  			angular.forEach(vm.contacts, function(contact) {
  				contact.selected = false;
  				contact.editing = false;
  			});
  		}
  		
  		function selectContact(contact){
  			resetSelectContact();
      		vm.selectedContact = contact;
  			vm.selectedContact.selected = true;
  			
  			// Call service to get agreement by contactcode
  			getAgrement(contact.contactId);
  		};
  		
    	function loadAll() {
    		console.log('searchContact');
    		
    		ContactService.getAll({}, onSuccess, onError);
    		
    		function onSuccess(result) {
    			vm.contacts = result;
    		}
    		
    		function onError(result) {
    			
    		}
    	}
    	
    	function getAgrement(coId) {
    		vm.Agreements = [];
    		ContactService.getAgrement({contactId: coId}, onGetAgrementSuccess, onGetAgrementError);
    		
    		function onGetAgrementSuccess(result) {
    			vm.Agreements = result;
            }

            function onGetAgrementError(result) {
            }
  		}
    }
})();


